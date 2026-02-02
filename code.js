function getNumber(id) {
  const el = document.getElementById(id);
  const v = el ? el.value.trim() : "";
  if (v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function getWeight(id) {
  // 權重：空白當 0（讓你可以只填一格100）
  const n = getNumber(id);
  return n === null ? 0 : n;
}

function nearlyEqual(a, b, eps = 1e-6) {
  return Math.abs(a - b) < eps;
}

function calculate() {
  const w1 = getWeight("w1");
  const w2 = getWeight("w2");
  const w3 = getWeight("w3");

  const s1 = getNumber("s1");
  const s2 = getNumber("s2");
  const s3 = getNumber("s3");

  const pass = Number(document.getElementById("passLevel").value);
  const resultEl = document.getElementById("result");

  // 基本檢查：權重不可負
  if ([w1, w2, w3].some(w => !Number.isFinite(w) || w < 0)) {
    resultEl.textContent = "權重請輸入 0~100 的數字";
    return;
  }

  const wSum = w1 + w2 + w3;

  if (!nearlyEqual(wSum, 100)) {
    resultEl.textContent = `權重總和必須等於 100%，你目前是 ${wSum.toFixed(2)}%`;
    return;
  }

  // ✅ 只要求「權重 > 0」的項目一定要有成績
  const requiredScoresOk =
    (w1 === 0 || s1 !== null) &&
    (w2 === 0 || s2 !== null) &&
    (w3 === 0 || s3 !== null);

  if (!requiredScoresOk) {
    resultEl.textContent = "請把「有設定權重」的項目成績填完整再計算";
    return;
  }

  // 成績空白但權重=0 → 當 0 不影響
  const ss1 = s1 ?? 0;
  const ss2 = s2 ?? 0;
  const ss3 = s3 ?? 0;

  const total = (w1 * ss1 + w2 * ss2 + w3 * ss3) / 100;
  const levelText = pass === 60 ? "大學(60)" : "碩士(70)";

  resultEl.textContent =
    total >= pass
      ? `總成績：${total.toFixed(2)} 分 ✅ 通過（及格線：${levelText}）`
      : `總成績：${total.toFixed(2)} 分 ❌ 未通過（及格線：${levelText}）`;
}

function tryAutoCalculate() {
  const w1 = getWeight("w1");
  const w2 = getWeight("w2");
  const w3 = getWeight("w3");

  const s1 = getNumber("s1");
  const s2 = getNumber("s2");
  const s3 = getNumber("s3");

  const resultEl = document.getElementById("result");

  const wSum = w1 + w2 + w3;

  // 權重加總不到 100 → 提示，不計算
  if (!nearlyEqual(wSum, 100)) {
    resultEl.textContent = `權重目前 ${wSum.toFixed(2)}%，需滿 100% 才會自動計算`;
    return;
  }

  // 只檢查權重>0 的成績
  const requiredScoresOk =
    (w1 === 0 || s1 !== null) &&
    (w2 === 0 || s2 !== null) &&
    (w3 === 0 || s3 !== null);

  if (!requiredScoresOk) {
    resultEl.textContent = "權重已滿 100%，請把「有設定權重」的成績填完即可自動計算";
    return;
  }

  // ✅ 條件達成 → 自動計算
  calculate();
}

/* ✅ 保險：掛到全域 */
window.calculate = calculate;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnCalc");
  if (btn) btn.addEventListener("click", calculate);

  ["w1", "w2", "w3", "s1", "s2", "s3"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", tryAutoCalculate);
  });

  const passLevel = document.getElementById("passLevel");
  if (passLevel) passLevel.addEventListener("change", tryAutoCalculate);

  // 進頁面先跑一次（避免預設值已=100卻不算）
  tryAutoCalculate();
});
