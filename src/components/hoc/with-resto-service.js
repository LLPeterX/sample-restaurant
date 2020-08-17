import React from 'react';
import RestoServiceContext from '../resto-service-context';

const WithRestoService = () => (WrappedComponent) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {
                    (RestoService) => <WrappedComponent {...props} RestoService={RestoService}/>
                }
                
            </RestoServiceContext.Consumer>
        )
    }
};

export default WithRestoService;