import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from 'react-currency-input';

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    if(title=== '' || description === '' || value=== ''){
      alert("Favor preencher os campos");
    }else{
      const data = {
        title,
        description,
        value
      };
      

      try {
        await api.post("/incidents", data, {
          headers: { Authorization: ongId }
        });

        history.push("/profile");
      } catch (err) {
        console.log(err);
        alert("Erro no cadastro, tente novamente");
      }
    }
  }
  function handleChange(event, maskedvalue, floatvalue){
    setValue(maskedvalue)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar no caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <CurrencyInput  
            placeholder="Valor em reais"
            value={value}
            onChange={handleChange}
            decimalSeparator=","
            thousandSeparator="."
            allowEmpty={true}
          />
          
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
