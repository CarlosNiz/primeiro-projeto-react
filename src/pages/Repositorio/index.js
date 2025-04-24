import React, { useEffect, useState } from "react";
import { Container } from './styles';
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

    return( 
        <Container>

        </Container>
    );
}