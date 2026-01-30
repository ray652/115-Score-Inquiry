function getNumber(id) {
  const el = document.getElementById(id);
  const v = el ? el.value.trim() : "";
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function calculate() {
  const w1 = getNumber("w1");
  const w2 = getNumber("w2");
  const w3 = getNumber("w3");
  const s1 = getNumber("s1");
  const s2 = getNumber("s2");
  const s3 = getNumber("s3");

  const pass = Number(document.getElementById("passLevel").value);
  const resultEl = document.getElementById("result");

  if ([w1, w2, w3, s1, s2, s3].some(v => v === null)) {
    resultEl.textContent = "請把權重與成績都填完整再計算";
    return;
  }

  const wSum = w1 + w2 + w3;
  if (wSum !== 100) {
    resultEl.textContent = `權重總和必須等於 100%，你目前是 ${wSum}%`;
    return;
  }

  const total = (w1 * s1 + w2 * s2 + w3 * s3) / 100;
  const levelText = pass === 60 ? "大學(60)" : "碩士(70)";

  resultEl.textContent =
    total >= pass
      ? `總成績：${total.toFixed(2)} 分 ✅ 通過（及格線：${levelText}）`
      : `總成績：${total.toFixed(2)} 分 ❌ 未通過（及格線：${levelText}）`;
}

/* ✅ 保險：掛到全域，避免 scope 問題 */
window.calculate = calculate;

/* ✅ 直接綁定按鈕點擊事件 */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalc");
  if (btn) btn.addEventListener("click", calculate);
});
