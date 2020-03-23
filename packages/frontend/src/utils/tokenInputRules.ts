export default {
    required: {
        value: true,
        message: 'The token is required.'
    },
    pattern: {
        value: /[0-9]/,
        message: 'The token should only contain numbers.'
    },
    minLength: {
        value: 6,
        message: 'The token should be 6 digits long.'
    },
    maxLength: {
        value: 6,
        message: 'The token should be 6 digits long.'
    }
};
