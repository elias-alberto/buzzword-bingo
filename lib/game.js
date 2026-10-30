import crypto from "crypto";
export const WORD_LISTS = {
  IT: ["AI-powered","Cloud-first","API","Zero trust","Single pane of glass","Automation","Scalable","DevOps","Microservices","Technical debt","Data-driven","Machine learning","Cybersecurity","Digital twin","Observability","Containerisation","Edge computing","RAG","Platform engineering","SaaS","Latency","Integration","Architecture","Telemetry","Proof of concept","MVP","Legacy system","Migration","High availability","Root cause"],
  Management: ["Synergy","Low-hanging fruit","Circle back","Bandwidth","Deep dive","Agile","Best practice","Quick win","Roadmap","Stakeholder","KPI","Transformation","Alignment","Action item","Leverage","Value-add","Touch base","Next steps","North star","Strategic fit","Pain point","Move the needle","Operating model","Governance","Deliverable","Future-proof","Core competency","Win-win","Holistic approach","Thought leadership"],
  HR: ["Employee experience","Talent pipeline","Culture fit","People strategy","Engagement survey","Wellbeing","Onboarding","Upskilling","Reskilling","Career path","Retention","Workforce planning","Performance cycle","Learning journey","Psychological safety","Hybrid working","Employer brand","Succession planning","Competency framework","Recognition","Belonging","Inclusive leadership","Headcount","People analytics","Internal mobility","Pulse check","Growth mindset","Feedback culture","Work-life balance","Team building"],
  Marketing: ["Brand awareness","Conversion funnel","Customer journey","Call to action","SEO","Thought leadership","Content strategy","Engagement","Impressions","Click-through rate","Target audience","Go-to-market","Campaign","Organic reach","Paid media","Lead generation","Personalisation","Marketing qualified lead","A/B test","Value proposition","Brand voice","Social proof","Omnichannel","Market segment","Influencer","Analytics","Retargeting","Storytelling","Share of voice","Customer persona"]
};
export const LIST_NAMES=Object.keys(WORD_LISTS);
export function makeBoard(selected=["IT","Management"]){
 const valid=[...new Set(selected)].filter(x=>WORD_LISTS[x]);
 const pool=[...new Set((valid.length?valid:["IT"]).flatMap(x=>WORD_LISTS[x]))];
 for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 return pool.slice(0,25);
}
export function cleanName(v,max=40){return String(v||"").trim().replace(/\s+/g," ").slice(0,max)}
export function playerKey(token){return crypto.createHash("sha256").update(token).digest("hex")}
export function isBingo(marked){const s=new Set(marked);const rows=[0,1,2,3,4].map(a=>[0,1,2,3,4].map(b=>a*5+b));const cols=[0,1,2,3,4].map(a=>[0,1,2,3,4].map(b=>b*5+a));return [...rows,...cols].some(line=>line.every(i=>s.has(i)))}
export function validToken(v){return typeof v==="string"&&/^[a-f0-9-]{20,80}$/i.test(v)}
export function validLists(v){return Array.isArray(v)?[...new Set(v)].filter(x=>LIST_NAMES.includes(x)):[]}
