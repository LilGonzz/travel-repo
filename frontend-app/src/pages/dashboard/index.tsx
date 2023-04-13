import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { setupAPIClient } from '@/services/api';
import { FiRefreshCcw } from 'react-icons/fi';
import styles from './styles.module.scss'
import Modal from 'react-modal'
import { ModalDashboard } from '@/components/Modal';
import Router from 'next/router';

export const apiKey = 'cc23cc0ab4a4065b17471d511c789bf8';

type Stop = {
  id: number,
  latitude: string,
  longitude: string,
  cityName: string,
  position: number
}

export type responseTrips = {
    id: number,
    distanceTime: number,
    stops: Stop[],
}


Modal.setAppElement('#__next');

export default function Dashboard(){
  const [travelList, setTravelList] = useState<responseTrips[]>([])
  const [modalItem, setModalItem] = useState<responseTrips>()
  const [modalVisible, setModalVisible] = useState(false)  

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: number){
    const apiClient = setupAPIClient();
    const apiUrl = '/travel/' + id;
    const response = await apiClient.get(apiUrl)
    setModalItem(response.data.travel);
    setModalVisible(true);
  }

  async function handleFinalizeTrip(id:number) {
    const apiClient = setupAPIClient();
    const apiUrl = '/travel/' + id;
    const response = await apiClient.delete(apiUrl)
    setModalVisible(false);
  }

  async function handleUpdateTrip(id:number) {
    Router.push(`/updateTrip?id=${id}`)
  }

  useEffect(() => {
    async function fetchData() {
      const api = setupAPIClient();
      const response = await api.get('/actives-travels');
      const responseData = response.data.travel;
      setTravelList(responseData);
    }
    fetchData();
  }, [])


  return(
    <>
    <Head>
      <title>Painel</title>
    </Head>
    <div>
      <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
              <h1>Viagens ativas</h1>
              <button>
                  <FiRefreshCcw size={25} color="#3fffa3"/>
              </button>
          </div>
          
          {travelList.map(item  => (
              <article className={styles.listOrders}>
                  <section className={styles.orderItem}>
                      <button onClick={() => handleOpenModalView(item.id)}>
                          <div className={styles.tag}></div>
                          <span>{item.id}</span>
                      </button>
                  </section>
              </article>
          ))}
    </main>

    {modalVisible && (
      <ModalDashboard
        isOpen={modalVisible}
        onRequestClose={handleCloseModal}
        trip={modalItem!}
        finalizeTrip={handleFinalizeTrip}
        updateTrip={handleUpdateTrip}
      />
    )}
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return{
      props:{

      }
    }
}) 
