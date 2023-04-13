import { SyntheticEvent, useState } from "react";
import styles from "./styles.module.scss";
import { Header } from "@/components/Header";
import Head from "next/head";
import { setupAPIClient } from "@/services/api";
import { apiKey } from "../dashboard";
import  Router  from "next/router";

type Stop = {
  latitude: string,
  longitude: string,
  cityName: string,
  position: number
}

export default function Form() {
  const [name, setName] = useState("");
  const [additionalFields, setAdditionalFields] = useState([]);
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(name, additionalFields);
  };
  
  function addInput() {
    const newId = inputs.length + 1;
    setInputs([...inputs, { id: newId, value: '' }]);
  }

  async function showdata(e: SyntheticEvent){
    e.preventDefault();
    let stops: Stop[] = []
    for(let x = 0; x <= inputs.length - 1; x++) {
      if(inputs[x].value != ''){
        const cityName = inputs[x].value;
        console.log(cityName)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        
        await fetch(url)
          .then(response => response.json())
          .then(data => {
            
            let { coord } = data;
            
            const latitude: string = coord.lat;
            const longitude: string = coord.lon;
            const position: number = x;
            const obj = {latitude, longitude, cityName, position};

            stops.push(obj);
        })
        .catch(error => {
          console.error(error);
        });
    }};
    
    const api = setupAPIClient();
    await api.post('/travel', {
      stops: stops
    })
    
    Router.push('/dashboard')
  }

  return (
          <>
          <Head>
            <title>Nova Viagem</title>
          </Head>
          <div>
                <Header/>
                <main className={styles.container}>
                  <h1>Insira os nomes das cidades</h1>
                  <form className={styles.form} onSubmit={handleRegister}>
                  {inputs.map((input, index) => (
                  <div key={input.id} className={styles.row}>
                    <input 
                      type="text" 
                      placeholder="Digite o nome da categoria"
                      className={styles.input}
                      value={input.value}
                      onChange={e => {
                        const newInputs = [...inputs];
                        newInputs[index].value = e.target.value;
                        setInputs(newInputs);
                      }}
                    />
                    {index === inputs.length - 1 && (
                      <button className={styles.buttonAdd} onClick={addInput}>
                        +
                      </button>
                    )}
                  </div>
                ))}
                
                <button type="submit" onClick={showdata} className={styles.buttonAdd}>
                    Cadastrar
                </button>
                </form>
              </main>
          </div>
      </>
  )
}