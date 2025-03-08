let _setLoading = null;
let loadingRequestCount = 0;

export function setGlobalLoadingCallback(fn) {
  _setLoading = fn;
}

export function showLoading() {
  loadingRequestCount++;
  if (_setLoading) {
    _setLoading(true);
  }
}

export function hideLoading() {
  loadingRequestCount--;
  if (loadingRequestCount <= 0) {
    loadingRequestCount = 0; // 음수 방지
    if (_setLoading) {
      _setLoading(false);
    }
  }
}