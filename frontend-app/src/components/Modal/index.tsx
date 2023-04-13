import Modal from 'react-modal'
import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'
import { responseTrips } from '@/pages/dashboard'


interface ModalTripProps{
    isOpen: boolean;
    onRequestClose: () => void;
    trip: responseTrips;
    finalizeTrip: (id: number) => void;
    updateTrip: (id: number) => void;
}

export function ModalDashboard({isOpen, onRequestClose, trip, finalizeTrip, updateTrip} : ModalTripProps ){
    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1D1D2E'
        }
    }


    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
        <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{background: 'transparent', border: 0}}
        >
            <FiX size={45} color='#f34648'></FiX>
        </button>

        <div className={styles.container}>
            <h2>Detalhes da viagem</h2>
            <span className={styles.table}>
                Id da viagem: <strong>{trip.id}</strong><br/>
                Hora total de viagem: <strong>{trip.distanceTime.toFixed(2)} horas</strong><br/>
                paradas:<br/>
            </span>
            {trip.stops.map(item => (
                <section key={item.id} className={styles.containerItem}>
                    <span>{item.cityName}</span>
                </section>
            ))}
            <button className={styles.buttonOrder} onClick={ () => updateTrip(trip.id) }>
                Editar viagem
            </button>

            <button className={styles.buttonOrder} onClick={ () => finalizeTrip(trip.id) }>
                Finalizar Viagem
            </button>

        </div>
        </Modal>
    )
}