let _setLoading = null;

// 로딩 상태를 등록하는 콜백 (LoadingProvider에서 설정)
export function setGlobalLoadingCallback(fn) {
  _setLoading = fn;
}

// 로딩 표시
export function showLoading() {
  if (_setLoading) {
    _setLoading(true);
  }
}

// 로딩 해제
export function hideLoading() {
  if (_setLoading) {
    _setLoading(false);
  }
}