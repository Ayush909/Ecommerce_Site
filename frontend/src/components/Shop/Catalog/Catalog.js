import React from 'react'
import Grid from '@mui/material/Grid'
import { Container, Paper } from '@mui/material'
import ProductCard from '../Products/ProductCard'

const Catalog = () => {
  return (
    <React.Fragment>
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                   <ProductCard/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper>2</Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper>3</Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper>4</Paper>
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
  )
}

export default Catalog