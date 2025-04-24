import React, { useEffect, useState } from "react";
import { Container, Owner, Loading, BackButton } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';
import { useParams } from "react-router-dom";

export default function Repositorio() {
    const { repositorioParam } = useParams();

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            const [ repositorioData, issuesData ] = await Promise.all([
                api.get(`/repos/${repositorioParam}`),
                api.get(`/repos/${repositorioParam}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false)

        }

        load();

    }, [repositorioParam]);

    if(loading) {
        return(
            <Loading>
                <h1>Carregando</h1>
            </Loading>
        );
    }

    return( 
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>

            <Owner>
                <img 
                    src={repositorio.owner.avatar_url} 
                    alt={repositorio.owner.login} 
                />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>
        </Container>
    );
}