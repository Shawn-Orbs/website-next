(function(){"use strict";
// Language support for the burn tracker. Static text uses data-i18n (textContent) and data-i18n-aria (aria-label).
// Dynamic text in app.js goes through window.OIP10I18N.t(key, params).
var D={
en:{
title:"ORBS Burn Tracker",desc:"A public record of the OIP-10 weekly ORBS burn.",skip:"Skip to burn history",tag:"Burn Tracker",net:"mainnet",langLabel:"Language",
themeDark:"Switch to dark mode",themeLight:"Switch to light mode",
burnedLbl:"Burned under OIP-10",burnedHint:"ORBS sent to the burn address by the Orbs burn controller",prog:"of 507,540,603 ORBS in the program",progDyn:"{pct}% of 507,540,603 ORBS in the program",
poolLbl:"In the burn pool",poolHint:"Held by the Orbs burn controller, waiting to be burned",latestLbl:"Latest burn",latestHint:"Most recent weekly burn",countLbl:"Burns recorded",countHint:"Weekly batches since the program started",
histH:"Burn history",reading:"Reading Ethereum…",thExec:"Executed (UTC)",thBurned:"ORBS burned",thBlock:"Block",thEvidence:"Evidence",loadingHist:"Loading burn history…",
histFine:"Every row is read directly from Ethereum: each transfer of ORBS from the burn controller to the burn address.",
pricingH:"Latest completed pricing week",twapK:"Time weighted average ORBS/USD",obsK:"Price observations in the week",gapK:"Longest gap between observations",covK:"Coverage check",
srcFine:"Source: CoinGecko ORBS/USD hourly observations.",chartAria:"Hourly ORBS/USD price over the pricing week with the time weighted average",legHourly:"Hourly price",legAvg:"Time weighted average",
howH:"How it works",s1h:"The vote",s1p:"OIP-10 passed a Snapshot vote that closed Nov 18, 2026.",s2h:"The total",s2p:"507,540,603 ORBS will be burned in weekly batches.",
s3h:"The source",s3p:"The ORBS come from the Orbs Long Term Reserves Pool and are held by the Orbs burn controller.",s4h:"The burn",s4p:"Each week the ORBS go to the dead address and the burn is recorded on Ethereum.",
methH:"How the weekly amount is calculated",
m1b:"Price the week.",m1a:"Each Monday to Monday week (UTC) uses hourly ORBS/USD prices from ",m1c:", with no gap over 2 hours.",
m2b:"Average it.",m2:"The hourly prices give one time weighted average price for the week.",
m3b:"Set the amount.",m3:"ORBS burned = weekly USD reference ÷ average price. Lower price, more ORBS. Higher price, fewer ORBS.",
m4b:"Burn it.",m4a:"The ",m4l:"Orbs burn controller",m4c:" sends the ORBS to the dead address. Each burn shows in the history above.",
flowLbl:"Worked flow",step:"Step {i} of {n}",steps:"{n} steps",
f1:"Hourly ORBS/USD prices, Monday to Monday UTC, no gap over 2 hours",f2:"Time weighted average price (P)",f3:"ORBS amount = weekly USD reference ÷ P",f4:"ORBS sent to the dead address, recorded on Ethereum",
methSrc:"Methodology follows OIP-10.",ctlH:"Key addresses",dtCtl:"Orbs burn controller",dtToken:"ORBS token",dtBurn:"Burn address",copy:"Copy",copied:"Copied",
resH:"Resources",r1:"OIP-10 proposal",r2:"Snapshot vote result",r3:"Orbs burn controller on Etherscan",r4:"ORBS token on Etherscan",r5:"Burn address on Etherscan",r6:"Weekly price source response",
foot:"Read only. Data from Ethereum mainnet and CoinGecko.",
nfPool:"Not funded yet. Burns begin once 507,540,603 ORBS are sent to the Orbs burn controller.",nfCount:"Not funded yet. Weekly batches start once the program is funded.",nfBurned:"Not funded yet. Nothing has been burned under OIP-10 so far.",
viewTx:"View transaction",viewExec:"View execution",noneYet:"None yet",firstNf:"Not funded yet. The first weekly burn will appear here.",first:"The first weekly burn will appear here",
noBurns:"No burns yet. The first weekly burn will appear here after it is executed.",blockPre:"Data read from Ethereum at block ",blockPost:"",
week:"{s} to {e} · Monday 00:00 UTC",hours:"{h} hours",notYet:"Not available yet",waitFinal:"Waiting for the final hourly price",justClosed:"The pricing week just closed. The final hourly price usually appears within about an hour.",
na:"Not available",incomplete:"Incomplete",failCov:"The price observations for this week do not pass the coverage check.",complete:"Complete",
srcDyn:"Source: CoinGecko ORBS/USD hourly observations{x}.",stale:" (showing the last loaded response; refresh failed)",unavail:"Unavailable",
histErr:"Burn history could not be loaded right now. Refresh to try again.",priceErr:"The price source could not be reached right now. Refresh later to try again.",
days:"Mon,Tue,Wed,Thu,Fri,Sat,Sun"},
ko:{
title:"ORBS 소각 트래커",desc:"OIP-10에 따른 주간 ORBS 소각의 공개 기록입니다.",skip:"소각 내역으로 건너뛰기",tag:"소각 트래커",net:"메인넷",langLabel:"언어",
themeDark:"다크 모드로 전환",themeLight:"라이트 모드로 전환",
burnedLbl:"OIP-10 누적 소각량",burnedHint:"Orbs 소각 컨트롤러가 소각 주소로 전송한 ORBS",prog:"프로그램 총량 507,540,603 ORBS 기준",progDyn:"프로그램 총량 507,540,603 ORBS 중 {pct}%",
poolLbl:"소각 대기 물량",poolHint:"Orbs 소각 컨트롤러가 보유 중이며 소각을 기다리는 ORBS",latestLbl:"최근 소각",latestHint:"가장 최근의 주간 소각",countLbl:"소각 횟수",countHint:"프로그램 시작 이후 집행된 주간 소각 횟수",
histH:"소각 내역",reading:"Ethereum 데이터 조회 중…",thExec:"실행 일시 (UTC)",thBurned:"소각된 ORBS",thBlock:"블록",thEvidence:"증빙",loadingHist:"소각 내역을 불러오는 중…",
histFine:"모든 행은 Ethereum에서 직접 조회한 데이터로, 소각 컨트롤러에서 소각 주소로 전송된 ORBS 내역을 하나씩 보여줍니다.",
pricingH:"가장 최근 완료된 가격 산정 주간",twapK:"ORBS/USD 시간가중평균가격 (TWAP)",obsK:"주간 가격 관측 횟수",gapK:"관측 간 최대 간격",covK:"커버리지 점검",
srcFine:"출처: CoinGecko ORBS/USD 시간별 관측 데이터.",chartAria:"가격 산정 주간의 시간별 ORBS/USD 가격과 시간가중평균가격",legHourly:"시간별 가격",legAvg:"시간가중평균가격",
howH:"작동 방식",s1h:"투표",s1p:"OIP-10은 2026년 11월 18일 마감된 Snapshot 투표에서 통과되었습니다.",s2h:"총량",s2p:"총 507,540,603 ORBS가 매주 나누어 소각됩니다.",
s3h:"재원",s3p:"소각되는 ORBS는 Orbs 장기 준비금 풀에서 나오며, Orbs 소각 컨트롤러가 보유합니다.",s4h:"소각",s4p:"매주 ORBS가 데드 주소로 전송되며, 소각 내역은 Ethereum에 기록됩니다.",
methH:"주간 소각량 산정 방식",
m1b:"주간 가격 산정.",m1a:"월요일부터 다음 월요일까지(UTC) 한 주 단위로 ",m1c:"의 시간별 ORBS/USD 가격을 사용하며, 관측 간격은 2시간을 넘지 않아야 합니다.",
m2b:"평균 산출.",m2:"시간별 가격으로 해당 주의 시간가중평균가격(TWAP)을 하나 산출합니다.",
m3b:"소각량 결정.",m3:"소각 ORBS 수량 = 주간 USD 기준 금액 ÷ 평균 가격. 가격이 낮으면 더 많은 ORBS가, 가격이 높으면 더 적은 ORBS가 소각됩니다.",
m4b:"소각 실행.",m4a:"",m4l:"Orbs 소각 컨트롤러",m4c:"가 ORBS를 데드 주소로 전송합니다. 각 소각은 위의 소각 내역에 표시됩니다.",
flowLbl:"산정 흐름",step:"{n}단계 중 {i}단계",steps:"총 {n}단계",
f1:"시간별 ORBS/USD 가격, 월요일부터 월요일까지(UTC), 관측 간격 2시간 이내",f2:"시간가중평균가격 (P)",f3:"ORBS 수량 = 주간 USD 기준 금액 ÷ P",f4:"ORBS를 데드 주소로 전송, Ethereum에 기록",
methSrc:"산정 방식은 OIP-10을 따릅니다.",ctlH:"주요 주소",dtCtl:"Orbs 소각 컨트롤러",dtToken:"ORBS 토큰",dtBurn:"소각 주소",copy:"복사",copied:"복사됨",
resH:"참고 자료",r1:"OIP-10 제안서",r2:"Snapshot 투표 결과",r3:"Orbs 소각 컨트롤러 (Etherscan)",r4:"ORBS 토큰 (Etherscan)",r5:"소각 주소 (Etherscan)",r6:"주간 가격 소스 응답 데이터",
foot:"읽기 전용. 데이터 출처: Ethereum 메인넷, CoinGecko.",
nfPool:"아직 입금 전입니다. 507,540,603 ORBS가 Orbs 소각 컨트롤러로 전송되면 소각이 시작됩니다.",nfCount:"아직 입금 전입니다. 프로그램 물량이 입금되면 주간 소각이 시작됩니다.",nfBurned:"아직 입금 전입니다. 현재까지 OIP-10에 따라 소각된 물량은 없습니다.",
viewTx:"트랜잭션 보기",viewExec:"실행 내역 보기",noneYet:"아직 없음",firstNf:"아직 입금 전입니다. 첫 주간 소각이 이곳에 표시됩니다.",first:"첫 주간 소각이 이곳에 표시됩니다",
noBurns:"아직 소각 내역이 없습니다. 첫 주간 소각이 실행되면 이곳에 표시됩니다.",blockPre:"Ethereum 블록 ",blockPost:" 기준 데이터",
week:"{s} ~ {e} · 월요일 00:00 UTC 기준",hours:"{h}시간",notYet:"산출 대기 중",waitFinal:"마지막 시간별 가격 대기 중",justClosed:"가격 산정 주간이 방금 마감되었습니다. 마지막 시간별 가격은 보통 1시간 이내에 반영됩니다.",
na:"산출 불가",incomplete:"미통과",failCov:"이번 주 가격 관측 데이터가 커버리지 점검을 통과하지 못했습니다.",complete:"통과",
srcDyn:"출처: CoinGecko ORBS/USD 시간별 관측 데이터{x}.",stale:" (새로고침에 실패하여 마지막으로 불러온 응답을 표시 중)",unavail:"조회 불가",
histErr:"현재 소각 내역을 불러올 수 없습니다. 새로고침 후 다시 시도해 주세요.",priceErr:"현재 가격 소스에 연결할 수 없습니다. 잠시 후 새로고침해 주세요.",
days:"월,화,수,목,금,토,일"},
ja:{
title:"ORBS バーントラッカー",desc:"OIP-10に基づく週次ORBSバーンの公開記録です。",skip:"バーン履歴へスキップ",tag:"バーントラッカー",net:"メインネット",langLabel:"言語",
themeDark:"ダークモードに切り替え",themeLight:"ライトモードに切り替え",
burnedLbl:"OIP-10によるバーン量",burnedHint:"OrbsバーンコントローラーからバーンアドレスへのORBS送付量",prog:"プログラム総量 507,540,603 ORBSのうち",progDyn:"プログラム総量 507,540,603 ORBSのうち {pct}%",
poolLbl:"バーンプール残高",poolHint:"Orbsバーンコントローラーが保有する、バーン待ちのORBS",latestLbl:"直近のバーン",latestHint:"最新の週次バーン",countLbl:"バーン実行回数",countHint:"プログラム開始以降の週次バッチ数",
histH:"バーン履歴",reading:"Ethereumを読み込み中…",thExec:"実行日時 (UTC)",thBurned:"バーンされたORBS",thBlock:"ブロック",thEvidence:"証跡",loadingHist:"バーン履歴を読み込み中…",
histFine:"各行はEthereumから直接読み取ったもので、バーンコントローラーからバーンアドレスへのORBS送付を1件ずつ示しています。",
pricingH:"直近の確定済み価格算定週",twapK:"ORBS/USD 時間加重平均価格 (TWAP)",obsK:"週内の価格観測数",gapK:"観測間の最大間隔",covK:"カバレッジチェック",
srcFine:"出典：CoinGecko ORBS/USD の1時間ごとの観測データ。",chartAria:"価格算定週におけるORBS/USDの1時間ごとの価格と時間加重平均価格",legHourly:"1時間ごとの価格",legAvg:"時間加重平均価格",
howH:"仕組み",s1h:"投票",s1p:"OIP-10は2026年11月18日に締め切られたSnapshot投票で可決されました。",s2h:"総量",s2p:"合計507,540,603 ORBSが週次バッチに分けてバーンされます。",
s3h:"原資",s3p:"対象のORBSはOrbs長期リザーブプールから拠出され、Orbsバーンコントローラーが保有します。",s4h:"バーン",s4p:"毎週ORBSがデッドアドレスへ送られ、そのバーンはEthereum上に記録されます。",
methH:"週次バーン量の算出方法",
m1b:"週の価格を算定。",m1a:"月曜日から翌月曜日まで(UTC)の各週について、",m1c:"の1時間ごとのORBS/USD価格を使用します。観測間隔は2時間以内とします。",
m2b:"平均を算出。",m2:"1時間ごとの価格から、その週の時間加重平均価格(TWAP)を1つ算出します。",
m3b:"数量を決定。",m3:"バーンされるORBS数量 = 週次USD基準額 ÷ 平均価格。価格が低いほどORBSは多く、価格が高いほどORBSは少なくなります。",
m4b:"バーンを実行。",m4a:"",m4l:"Orbsバーンコントローラー",m4c:"がORBSをデッドアドレスへ送ります。各バーンは上記の履歴に表示されます。",
flowLbl:"算出フロー",step:"ステップ {i}/{n}",steps:"全{n}ステップ",
f1:"1時間ごとのORBS/USD価格、月曜日から月曜日まで(UTC)、観測間隔2時間以内",f2:"時間加重平均価格 (P)",f3:"ORBS数量 = 週次USD基準額 ÷ P",f4:"ORBSをデッドアドレスへ送付し、Ethereumに記録",
methSrc:"算出方法はOIP-10に準拠しています。",ctlH:"主要アドレス",dtCtl:"Orbsバーンコントローラー",dtToken:"ORBSトークン",dtBurn:"バーンアドレス",copy:"コピー",copied:"コピー済み",
resH:"関連リンク",r1:"OIP-10 提案",r2:"Snapshot投票結果",r3:"Orbsバーンコントローラー (Etherscan)",r4:"ORBSトークン (Etherscan)",r5:"バーンアドレス (Etherscan)",r6:"週次価格ソースのレスポンス",
foot:"読み取り専用。データ出典：Ethereumメインネット、CoinGecko。",
nfPool:"まだ入金されていません。507,540,603 ORBSがOrbsバーンコントローラーに送られるとバーンが始まります。",nfCount:"まだ入金されていません。プログラムへの入金後、週次バッチが始まります。",nfBurned:"まだ入金されていません。現時点でOIP-10に基づくバーンはありません。",
viewTx:"トランザクションを見る",viewExec:"実行内容を見る",noneYet:"まだありません",firstNf:"まだ入金されていません。最初の週次バーンがここに表示されます。",first:"最初の週次バーンがここに表示されます",
noBurns:"まだバーンはありません。最初の週次バーンが実行されると、ここに表示されます。",blockPre:"Ethereum ブロック ",blockPost:" 時点のデータ",
week:"{s} 〜 {e} · 月曜日 00:00 UTC 起点",hours:"{h}時間",notYet:"算出待ち",waitFinal:"最終の1時間ごとの価格を待っています",justClosed:"価格算定週が締め切られたばかりです。最終の1時間ごとの価格は通常1時間ほどで反映されます。",
na:"算出不可",incomplete:"不足",failCov:"今週の価格観測データはカバレッジチェックを通過していません。",complete:"充足",
srcDyn:"出典：CoinGecko ORBS/USD の1時間ごとの観測データ{x}。",stale:"（更新に失敗したため、最後に取得したレスポンスを表示中）",unavail:"取得不可",
histErr:"現在バーン履歴を読み込めません。再読み込みしてもう一度お試しください。",priceErr:"現在価格ソースに接続できません。しばらくしてから再読み込みしてください。",
days:"月,火,水,木,金,土,日"}};
var KEY="oip10-lang",cur="en",subs=[],ROOT=document.documentElement;
function norm(v){v=String(v||"").toLowerCase().slice(0,2);return D[v]?v:null}
function pick(){var q=null;try{q=norm(new URLSearchParams(location.search).get("lang"))}catch(e){}if(q)return q;
 try{var s=norm(localStorage.getItem(KEY));if(s)return s}catch(e){}
 var nl=(navigator.languages&&navigator.languages[0])||navigator.language||"";nl=String(nl).toLowerCase().slice(0,2);return nl==="ko"||nl==="ja"?nl:"en"}
function t(k,p){var s=D[cur][k];if(s==null)s=D.en[k];if(s==null)return k;return p?s.replace(/\{(\w+)\}/g,function(m,n){return p[n]!=null?String(p[n]):m}):s}
function z(n){return n<10?"0"+n:String(n)}
function date(ms){var d=new Date(ms);
 if(cur==="ko")return d.getUTCFullYear()+"년 "+(d.getUTCMonth()+1)+"월 "+d.getUTCDate()+"일 "+z(d.getUTCHours())+":"+z(d.getUTCMinutes())+" UTC";
 if(cur==="ja")return d.getUTCFullYear()+"年"+(d.getUTCMonth()+1)+"月"+d.getUTCDate()+"日 "+z(d.getUTCHours())+":"+z(d.getUTCMinutes())+" UTC";
 return d.toLocaleString("en-GB",{timeZone:"UTC",day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}).replace(" at",",")+" UTC"}
function meta(sel,v){var m=document.querySelector(sel);if(m)m.setAttribute("content",v)}
var MQ=window.matchMedia?matchMedia("(max-width:760px)"):null;
function labels(){var sel=document.getElementById("lang");if(!sel)return;var sh=MQ&&MQ.matches;for(var i=0;i<sel.options.length;i++){var o=sel.options[i];o.textContent=o.getAttribute(sh?"data-s":"data-l")}sel.value=cur}
function apply(){ROOT.setAttribute("lang",cur);document.title=t("title");
 meta('meta[name="description"]',t("desc"));meta('meta[property="og:title"]',t("title"));meta('meta[property="og:description"]',t("desc"));meta('meta[name="twitter:title"]',t("title"));meta('meta[name="twitter:description"]',t("desc"));
 var a=document.querySelectorAll("[data-i18n]");for(var i=0;i<a.length;i++)a[i].textContent=t(a[i].getAttribute("data-i18n"));
 a=document.querySelectorAll("[data-i18n-aria]");for(i=0;i<a.length;i++)a[i].setAttribute("aria-label",t(a[i].getAttribute("data-i18n-aria")));
 labels()}
function set(l,save){l=norm(l)||"en";var ch=l!==cur;cur=l;if(save){try{localStorage.setItem(KEY,l)}catch(e){}
  try{var u=new URL(location.href);if(u.searchParams.has("lang")){u.searchParams.set("lang",l);history.replaceState(history.state,"",u.toString())}}catch(e){}}
 apply();if(ch)subs.forEach(function(f){try{f(l)}catch(e){console.warn("i18n",e)}})}
window.OIP10I18N={t:t,date:date,lang:function(){return cur},set:set,on:function(f){subs.push(f)}};
cur=pick();apply();
var sel=document.getElementById("lang");if(sel)sel.addEventListener("change",function(){set(sel.value,true)});
if(MQ){if(MQ.addEventListener)MQ.addEventListener("change",labels);else if(MQ.addListener)MQ.addListener(labels)}
})();
