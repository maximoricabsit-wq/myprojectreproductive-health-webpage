document.addEventListener('DOMContentLoaded', function(){
  // Quiz handling
  const submitQuiz = document.getElementById('submitQuiz');
  if(submitQuiz){
    submitQuiz.addEventListener('click', function(){
      const answers = {
        q1: 'B',
        q2: 'True',
        q3: 'C',
        q4: 'C',
        q5: 'Endometrium',
        q6: 'True',
        q7: 'C',
        q8: 'Parturition',
        q9: 'A',
        q10: 'True'
      };
      let score = 0;
      // radio / text checks
      for(let i=1;i<=10;i++){
        const name = 'q'+i;
        const el = document.getElementsByName(name);
        if(!el) continue;
        if(el[0].type === 'radio'){
          let chosen = '';
          for(const r of el) if(r.checked) chosen = r.value;
          if(chosen && chosen.toString().toLowerCase() === answers[name].toString().toLowerCase()) score++;
        } else {
          // text input
          const val = el[0].value.trim().toLowerCase();
          if(val && answers[name] && val === answers[name].toLowerCase()) score++;
        }
      }
      const resultDiv = document.getElementById('quizResult');
      resultDiv.innerHTML = '<strong>Your score: ' + score + ' / 10</strong><p>' + (score >= 7 ? 'Good job!' : 'Review the anatomy page to improve.') + '</p>';
    });
  }

  // Survey handling - collect and offer JSON download
  const submitSurvey = document.getElementById('submitSurvey');
  const downloadSurvey = document.getElementById('downloadSurvey');
  if(submitSurvey){
    submitSurvey.addEventListener('click', function(){
      const form = document.getElementById('surveyForm');
      const data = {};
      Array.from(form.elements).forEach(el=>{
        if(!el.name) return;
        if(el.type === 'number' || el.tagName.toLowerCase()==='textarea' || el.type==='text') data[el.name]=el.value;
      });
      // simple required validation
      for(let i=1;i<=15;i++){
        if(!data['s'+i] || data['s'+i]==='') { alert('Please answer all 15 rating questions.'); return; }
      }
      document.getElementById('surveyResult').innerHTML = '<strong>Thank you — your response has been recorded locally.</strong>';
      // enable download
      const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      downloadSurvey.style.display='inline-block';
      downloadSurvey.onclick = function(){
        const a = document.createElement('a');
        a.href = url;
        a.download = 'survey-response.json';
        a.click();
      };
    });
  }
});
