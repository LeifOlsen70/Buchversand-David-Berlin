import {firebaseConfig} from './firebase-config.js';
const SDK='https://www.gstatic.com/firebasejs/10.14.1/';
let ctx=null,messagingModule=null,messaging=null,unsubscribe=null,registration=null;
let pushState={message:'Mitteilungen noch nicht eingerichtet.',enabled:false,key:''};
const deviceKey='buchversand-push-device';
function deviceId(){let id=localStorage.getItem(deviceKey);if(!id){id=crypto.randomUUID();localStorage.setItem(deviceKey,id)}return id}
const onIphone=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const standalone=()=>navigator.standalone===true||window.matchMedia('(display-mode: standalone)').matches;
export function pushPanel(esc){return `<div class="panel"><h2>🔔 Auftrags-Mitteilungen</h2><p class="muted" id="pushStatus" role="status">${esc(pushState.message)}</p><p class="muted">Auf dem iPhone die App über das Symbol auf dem Home-Bildschirm öffnen. Mitteilungen gelten jeweils für dieses Gerät.</p><details><summary>Einrichtung: öffentlicher Web-Push-Schlüssel</summary><label class="label" for="pushVapid">Öffentlicher Schlüssel aus Firebase → Cloud Messaging → Web-Push-Zertifikate</label><input id="pushVapid" autocomplete="off" placeholder="Öffentlichen Schlüssel einfügen" value="${esc(pushState.key)}"><button class="wide secondary" style="margin-top:12px" data-push="key">Schlüssel speichern</button></details><div class="stack" style="margin-top:14px"><button class="wide" data-push="toggle">${pushState.enabled?'Mitteilungen ausschalten':'Mitteilungen einschalten'}</button><button class="secondary" data-push="test">Testmitteilung senden</button></div><p class="muted">Automatische Mitteilungen benötigen zusätzlich die eingerichtete Firebase-Serverfunktion. Empfänger ist ausschließlich dein Administratorkonto.</p></div>`}
function updatePushButtons(){const toggle=document.querySelector('[data-push="toggle"]');if(toggle)toggle.textContent=pushState.enabled?'Mitteilungen ausschalten':'Mitteilungen einschalten';}
function report(message){pushState.message=message;updatePushButtons();const el=document.querySelector('#pushStatus');if(el)el.textContent=message}
async function runtime(){
 if(!messagingModule)messagingModule=await import(SDK+'firebase-messaging.js');
 if(!await messagingModule.isSupported())throw Error('Dieser Browser unterstützt hier keine Push-Mitteilungen. Auf dem iPhone bitte die Home-Bildschirm-App verwenden.');
 if(!registration)registration=await navigator.serviceWorker.register(new URL('./firebase-messaging-sw.js',import.meta.url),{scope:new URL('./',import.meta.url).pathname});
 if(!registration.active)await new Promise((resolve,reject)=>{const worker=registration.installing||registration.waiting;if(!worker)return reject(Error('Mitteilungsdienst konnte nicht gestartet werden.'));const timer=setTimeout(()=>reject(Error('Mitteilungsdienst braucht zu lange. App neu öffnen und erneut versuchen.')),15000);const check=()=>{if(worker.state==='activated'){clearTimeout(timer);resolve()}else if(worker.state==='redundant'){clearTimeout(timer);reject(Error('Mitteilungsdienst konnte nicht aktiviert werden.'))}};worker.addEventListener('statechange',check);check()});
 if(!messaging)messaging=messagingModule.getMessaging(ctx.api.getApp());
 if(!unsubscribe)unsubscribe=messagingModule.onMessage(messaging,async payload=>{const n=payload.notification||{};if(payload.data?.badgeCount!==undefined)await updateOrderBadge(Number(payload.data.badgeCount));await registration.showNotification(n.title||'Buchversand',{body:n.body||'Ein neuer Versandauftrag ist eingegangen.',icon:new URL('./icon-192.png',import.meta.url).href,tag:payload.data?.orderId?'order-'+payload.data.orderId:'buchversand-test',data:{url:new URL('./?view=pending',import.meta.url).href}});ctx.onOrder()});
}
async function saveDevice(){const token=await messagingModule.getToken(messaging,{vapidKey:pushState.key,serviceWorkerRegistration:registration});if(!token)throw Error('Keine Push-Anmeldung erhalten. Bitte erneut versuchen.');const url=new URL('./',import.meta.url);await ctx.api.setDoc(ctx.api.doc(ctx.db,'pushDevices',deviceId()),{ownerUid:ctx.user.uid,token,appUrl:url.href,updatedAt:ctx.api.serverTimestamp()});pushState.enabled=true}
export async function connectPush(context){
 ctx=context;
 try{const snap=await ctx.api.getDocFromServer(ctx.api.doc(ctx.db,'pushConfig','public'));pushState.key=snap.exists()?snap.data().vapidKey||'':'';
 if(!('Notification' in window)||!('serviceWorker' in navigator)){report('Bitte auf einem unterstützten Gerät öffnen.');return}
 const saved=localStorage.getItem(deviceKey);const device=saved?await ctx.api.getDocFromServer(ctx.api.doc(ctx.db,'pushDevices',saved)):null;
 pushState.enabled=!!device?.exists();
 if(pushState.enabled&&Notification.permission==='granted'&&pushState.key){await runtime();await saveDevice();report('Empfang auf diesem Gerät eingerichtet. Bitte mit „Testmitteilung senden“ prüfen.')}
 else report(pushState.key?'Schlüssel hinterlegt. Du kannst Mitteilungen aktivieren.':'Zuerst den öffentlichen Web-Push-Schlüssel aus Firebase hinterlegen.');
 }catch(e){report('Push-Einrichtung konnte nicht geladen werden: '+e.message)}
}
async function enable(){
 if(onIphone()&&!standalone())throw Error('Bitte zuerst zum Home-Bildschirm hinzufügen und die App über dieses Symbol öffnen.');
 if(!('Notification' in window)||!('serviceWorker' in navigator))throw Error('Push-Mitteilungen werden hier nicht unterstützt.');
 if(!pushState.key)throw Error('Bitte zuerst den öffentlichen Web-Push-Schlüssel speichern.');
 // Request synchronously from the user gesture, before network or SDK work (iOS).
 const permission=await Notification.requestPermission();if(permission!=='granted')throw Error('Mitteilungen sind nicht erlaubt. Bitte in den iPhone-Einstellungen für diese App erlauben.');
 await runtime();await saveDevice();report('Empfang eingerichtet. Jetzt „Testmitteilung senden“ antippen; die Serverfunktion muss bereits eingerichtet sein.');
}
export async function disconnectPush(){
 await updateOrderBadge(0);if(!ctx)return;const id=localStorage.getItem(deviceKey);
 if(id)await ctx.api.deleteDoc(ctx.api.doc(ctx.db,'pushDevices',id));
 if(messaging&&messagingModule)await messagingModule.deleteToken(messaging);
 if(unsubscribe){unsubscribe();unsubscribe=null}pushState.enabled=false;report('Mitteilungen auf diesem Gerät ausgeschaltet.');
}
export function wirePush(){document.querySelectorAll('[data-push]').forEach(b=>b.onclick=async()=>{
 const action=b.dataset.push;const key=document.querySelector('#pushVapid')?.value.trim();b.disabled=true;
 try{
 if(!ctx)throw Error('Bitte kurz warten, bis Firebase und dein Administratorkonto geladen sind.');
 if(action==='key'){if(!/^[A-Za-z0-9_-]{87}$/.test(key||''))throw Error('Bitte den vollständigen öffentlichen Web-Push-Schlüssel einfügen (87 Zeichen).');await ctx.api.setDoc(ctx.api.doc(ctx.db,'pushConfig','public'),{vapidKey:key});pushState.key=key;report('Schlüssel gespeichert. Jetzt Mitteilungen aktivieren.')}
 if(action==='toggle'){if(pushState.enabled)await disconnectPush();else await enable();}
 if(action==='test'){
 if(!pushState.enabled)throw Error('Bitte zuerst Mitteilungen aktivieren.');
 const f=await import(SDK+'firebase-functions.js');const result=await f.httpsCallable(f.getFunctions(ctx.api.getApp(),'europe-west1'),'testOrderPush')({deviceId:deviceId()});
 report(result.data?.sent?'Test an den Push-Dienst übergeben. Bitte prüfen, ob die Mitteilung auf deinem Gerät erscheint.':'Der Test konnte nicht gesendet werden.');
 }
 }catch(e){report('Hinweis: '+e.message+(String(e.code||'').includes('not-found')?' Die Firebase-Serverfunktion ist noch nicht veröffentlicht.':''));alert(pushState.message)}finally{b.disabled=false;updatePushButtons()}
})}

export async function updateOrderBadge(count){try{if('setAppBadge' in navigator){if(count>0)await navigator.setAppBadge(count);else await navigator.clearAppBadge()}}catch{}}
