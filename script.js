const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.tcg-card')];
const search = document.getElementById('cardSearch');
let activeFilter = 'all';
function updateCards(){
  const term = search.value.trim().toLowerCase();
  cards.forEach(card=>{
    const kinds = card.dataset.kind.split(' ');
    const matchesFilter = activeFilter === 'all' || kinds.includes(activeFilter);
    const matchesSearch = card.dataset.name.includes(term) || card.innerText.toLowerCase().includes(term);
    card.style.display = matchesFilter && matchesSearch ? '' : 'none';
  });
}
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); activeFilter=btn.dataset.filter; updateCards();
}));
search.addEventListener('input',updateCards);

const packs = document.getElementById('packs');
const prob = document.getElementById('prob');
const packPrice = document.getElementById('packPrice');
function calculate(){
  const n = Math.max(1, Number(packs.value)||1);
  const p = Math.min(1,Math.max(0,Number(prob.value)||0)/100);
  const cost = Math.max(0,Number(packPrice.value)||0)*n;
  const noHit = Math.pow(1-p,n);
  const hit = 1-noHit;
  document.getElementById('packsValue').textContent=n;
  document.getElementById('probValue').textContent=(p*100).toFixed(2)+'%';
  document.getElementById('chance').textContent=(hit*100).toFixed(1)+'%';
  document.getElementById('noHit').textContent=(noHit*100).toFixed(1)+'%';
  document.getElementById('spend').textContent=cost.toLocaleString('en-GB',{style:'currency',currency:'GBP'});
  document.getElementById('meterFill').style.width=(hit*100)+'%';
  const insight = hit < .25 ? 'A hit is unlikely at this setting. Consider whether buying a single is better for your goal.' : hit < .7 ? 'A hit is possible—but there is still a meaningful chance of no hit. Treat packs as entertainment.' : 'The modelled chance is higher, but it is still not a guarantee. Set a firm spending limit.';
  document.getElementById('labInsight').textContent=insight;
}
[packs,prob,packPrice].forEach(el=>el.addEventListener('input',calculate));
calculate();

const monthlyBudget=document.getElementById('monthlyBudget');
const targetPrice=document.getElementById('targetPrice');
function budgetCalc(){
  const monthly=Math.max(0,Number(monthlyBudget.value)||0);
  const target=Math.max(0,Number(targetPrice.value)||0);
  const out=document.getElementById('months');
  if(target===0){out.textContent='Already there!';return}
  if(monthly===0){out.textContent='Set a budget';return}
  const months=Math.ceil(target/monthly);
  out.textContent=months+' month'+(months===1?'':'s');
}
[monthlyBudget,targetPrice].forEach(el=>el.addEventListener('input',budgetCalc));
budgetCalc();

document.getElementById('themeBtn').addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
  const dark=document.body.classList.contains('dark-mode');
  document.getElementById('themeBtn').textContent=dark?'☾ DISPLAY':'☼ DISPLAY';
});
