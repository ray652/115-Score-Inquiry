function getNumber(id) {
  const v = document.getElementById(id).value;
  if (v === "" || v === null) return null;
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

  const pass = Number(document.getElementById("passLevel").value); // 60 or 70

  const resultEl = document.getElementById("result");

  // 檢查是否都有填
  if ([w1, w2, w3, s1, s2, s3].some(v => v === null)) {
    resultEl.textContent = "請把權重與成績都填完整再計算";
    return;
  }

  // 權重總和檢查
  const wSum = w1 + w2 + w3;
  if (wSum !== 100) {
    resultEl.textContent = `權重總和必須等於 100%，你目前是 ${wSum}%`;
    return;
  }

  // 計算加權
  const total = (w1 * s1 + w2 * s2 + w3 * s3) / 100;

  const levelText = pass === 60 ? "大學(60)" : "碩士(70)";
  if (total >= pass) {
    resultEl.textContent = `總成績：${total.toFixed(2)} 分 ✅ 通過（及格線：${levelText}）`;
  } else {
    resultEl.textContent = `總成績：${total.toFixed(2)} 分 ❌ 未通過（及格線：${levelText}）`;
  }
}
