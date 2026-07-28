import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // يطبعها بالـ console عشان يظهر الخطأ الحقيقي بدل ما تختفي الصفحة بصمت
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          dir="rtl"
          style={{
            padding: 24,
            fontFamily: "sans-serif",
            color: "#b91c1c",
            background: "#fef2f2",
            minHeight: "100vh",
          }}
        >
          <h2 style={{ fontWeight: 800, marginBottom: 8 }}>صار خطأ غير متوقع</h2>
          <p style={{ marginBottom: 12 }}>
            هذا النص يظهر بدل الصفحة البيضاء عشان تعرف السبب بالضبط:
          </p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}