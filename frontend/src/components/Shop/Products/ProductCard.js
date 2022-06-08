import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import { IconButton } from '@mui/material';


const ProductCard = () => {
  return (
    <Card>
        <CardHeader
            action={
                <IconButton aria-label="settings">
                  <AccessAlarm />
                </IconButton>
              }
              title="Marvel: Comic Strip"
        />
    </Card>
  )
}

export default ProductCard