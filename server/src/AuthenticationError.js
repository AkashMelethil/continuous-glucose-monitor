import { GraphQLError } from 'graphql';

class AuthenticationError extends GraphQLError {
    constructor(errors) {
        super('The request is not authorized.');
        this.state = errors.reduce((result, error) => {
            if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                result[error.key].push(error.message);
            } else {
                result[error.key] = [error.message];
            }
            return result;
        }, {});
    }
}

export default AuthenticationError;