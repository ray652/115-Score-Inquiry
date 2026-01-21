function calculate() {
  const w1 = Number(document.getElementById("w1").value);
  const s1 = Number(document.getElementById("s1").value);

  const w2 = Number(document.getElementById("w2").value);
  const s2 = Number(document.getElementById("s2").value);

  const w3 = Number(document.getElementById("w3").value);
  const s3 = Number(document.getElementById("s3").value);

  const passLine = Number(document.getElementById("pass").value);

  const totalWeight = w1 + w2 + w3;

  const resultEl = document.getElementById("result");

  if (totalWeight !== 100) {
    resultEl.textContent = "⚠️ 權重總和必須是 100%";
    resultEl.style.color = "orange";
    return;
  }

  const finalScore =
    (s1 * w1 + s2 * w2 + s3 * w3) / 100;

  if (finalScore >= passLine) {
    resultEl.textContent =
      `✅ 總成績 ${finalScore.toFixed(2)} 分，不會被當`;
    resultEl.style.color = "green";
  } else {
    resultEl.textContent =
      `❌ 總成績 ${finalScore.toFixed(2)} 分，有被當風險`;
    resultEl.style.color = "red";
  }
}
