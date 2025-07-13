import React from 'react'
import HOC from '../../components/HOC/HOC'
import Notificationsend from './Notificationsend';

const PushNotification = () => {
    return <Notificationsend />;
};

export default HOC(PushNotification);