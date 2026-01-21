function calculate() {
  const weights = document.querySelectorAll(".weight");
  const scores = document.querySelectorAll(".score");
  const passLine = Number(document.getElementById("passLine").value);

  let total = 0;
  let weightSum = 0;

  for (let i = 0; i < weights.length; i++) {
    const w = Number(weights[i].value);
    const s = Number(scores[i].value);

    if (!isNaN(w) && !isNaN(s)) {
      total += s * w;
      weightSum += w;
    }
  }

  const resultEl = document.getElementById("result");

  if (weightSum !== 100) {
    resultEl.textContent = `⚠️ 權重總和必須是 100%，目前是 ${weightSum}%`;
    resultEl.style.color = "orange";
    return;
  }

  const finalScore = total / 100;

  if (finalScore >= passLine) {
    resultEl.textContent = `✅ 總成績 ${finalScore.toFixed(2)} 分，安全過關`;
    resultEl.style.color = "green";
  } else {
    resultEl.textContent = `❌ 總成績 ${finalScore.toFixed(2)} 分，有被當風險`;
    resultEl.style.color = "red";
  }
}
