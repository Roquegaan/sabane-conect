import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Hubo un error en el Empaquetador de Cursos.</h2>
                    <p>Esto no debe romper toda la aplicación. Podés intentar recargar o volver al inicio.</p>
                    <button type="button" onClick={this.handleRetry}>
                        Reintentar
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
