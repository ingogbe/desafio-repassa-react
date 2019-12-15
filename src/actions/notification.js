import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './codes/types';

export const success = (title, message, position, autoDismiss) => dispatch => {
	var id = Math.random().toString(36).substr(2, 9);

	dispatch({
		type: ADD_NOTIFICATION,
		payload: {
			title: title,
			message: message,
			position: position,
			autoDismiss: autoDismiss,
			type: 'success',
			creation: new Date().getTime(),
			id: id
		}
	});

	if(autoDismiss > 0){
		setTimeout(function(){
			dispatch({
				type: REMOVE_NOTIFICATION,
				payload: {
					id: id
				}
			});
		}, autoDismiss * 1000);
	}

}

export const error = (title, message, position, autoDismiss) => dispatch => {
	var id = Math.random().toString(36).substr(2, 9);

	dispatch({
		type: ADD_NOTIFICATION,
		payload: {
			title: title,
			message: message,
			position: position,
			autoDismiss: autoDismiss,
			type: 'error',
			creation: new Date().getTime(),
			id: id
		}
	});

	if(autoDismiss > 0){
		setTimeout(function(){
			dispatch({
				type: REMOVE_NOTIFICATION,
				payload: {
					id: id
				}
			});
		}, autoDismiss * 1000);
	}
}

export const remove = (id) => dispatch => {
	dispatch({
		type: REMOVE_NOTIFICATION,
		payload: {
			id: id
		}
	});
}