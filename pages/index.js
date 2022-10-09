import Head from 'next/head'
import Image from 'next/image'
import { Box, Container } from "@mui/material";
import styles from '../styles/Home.module.css'
import Snake from '../components/Snake';

export default function Home() {
  return (
    <Container>
      <Snake />
    </Container>
  )
}
