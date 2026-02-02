function getNumber(id) {
  const el = document.getElementById(id);
  const v = el ? el.value.trim() : "";
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/* ===== 浮點容忍 ===== */
function nearlyEqual(a, b, eps = 1e-6) {
  return Math.abs(a - b) < eps;
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
  if (!nearlyEqual(wSum, 100)) {
    resultEl.textContent = `權重總和必須等於 100%，你目前是 ${wSum.toFixed(2)}%`;
    return;
  }

  const total = (w1 * s1 + w2 * s2 + w3 * s3) / 100;
  const levelText = pass === 60 ? "大學(60)" : "碩士(70)";

  resultEl.textContent =
    total >= pass
      ? `總成績：${total.toFixed(2)} 分 ✅ 通過（及格線：${levelText}）`
      : `總成績：${total.toFixed(2)} 分 ❌ 未通過（及格線：${levelText}）`;
}

/* ===== ⭐ 自動計算核心 ===== */
function tryAutoCalculate() {
  const w1 = getNumber("w1");
  const w2 = getNumber("w2");
  const w3 = getNumber("w3");
  const s1 = getNumber("s1");
  const s2 = getNumber("s2");
  const s3 = getNumber("s3");

  const resultEl = document.getElementById("result");

  // 權重還沒填齊 → 不動作
  if ([w1, w2, w3].some(v => v === null)) return;

  const wSum = w1 + w2 + w3;

  // 權重未達 100 → 顯示提示
  if (!nearlyEqual(wSum, 100)) {
    resultEl.textContent = `權重目前 ${wSum.toFixed(2)}%，需滿 100% 才會自動計算`;
    return;
  }

  // 權重已滿，但成績未齊
  if ([s1, s2, s3].some(v => v === null)) {
    resultEl.textContent = "權重已滿 100%，請把成績填完即可自動計算";
    return;
  }

  // ✅ 條件全滿 → 自動算
  calculate();
}

/* ✅ 保險：掛到全域 */
window.calculate = calculate;

/* ===== 綁定事件 ===== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalc");
  if (btn) btn.addEventListener("click", calculate);

  // 權重、成績即時監聽
  ["w1", "w2", "w3", "s1", "s2", "s3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", tryAutoCalculate);
  });

  // 及格線切換也自動重算
  const passLevel = document.getElementById("passLevel");
  if (passLevel) passLevel.addEventListener("change", tryAutoCalculate);
});
