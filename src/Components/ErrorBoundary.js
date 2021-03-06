import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Something went wrong, cannot display at this time.</h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired
}