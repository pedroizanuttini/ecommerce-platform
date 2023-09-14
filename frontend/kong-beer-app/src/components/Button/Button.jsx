import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
    return (
        <button
            type={ props.type } 
            className={`button button--${props.shape} button-${props.color}`}
            onClick={ props.handleClick }
        >   
            { props.icon }
            { props.title }
        </button>
    )
}

Button.propTypes = { // Validating the props passed to the component
    title: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    handleClick: [PropTypes.func]
}

export default Button;