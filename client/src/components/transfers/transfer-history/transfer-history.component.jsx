import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux actions
import { getUsersTransfers } from '../../../store/actions/transfers.actions';

// Components
import TransferItem from '../transfer-item/transfer-item.component';

const TransferHistory = () => {
	const dispatch = useDispatch();
	const idUserLogged = localStorage.getItem('userId')

	useEffect(() => {
		dispatch(getUsersTransfers(idUserLogged));
	}, [dispatch, idUserLogged]);

	let transfers = useSelector(state => state.transfers.transfers)

	console.log(transfers)

	return (
		<div>
			{transfers &&
				transfers.map(transfer => <TransferItem transfer={transfer} />)}
		</div>
	);
};

export default TransferHistory;
