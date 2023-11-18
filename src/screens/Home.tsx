import { Image, VStack } from "native-base";
import { Activity } from "../components/Activity";

import serviceImage from '../assets/service.jpg'
import cellImage from '../assets/cell.jpg'
import ministryImage from '../assets/ministry.jpg'
import eventImage from '../assets/event.jpg'

export function Home () {
  return (
    <VStack px={8} py={16} mt={8}>
      <Activity 
        title="Cultos"
        subtitle="Fique por dentro dos nossos cultos"
        image={serviceImage}
      />
      
      <Activity 
        title="Células"
        subtitle="Encontre uma célula próximo a você"
        image={cellImage}
      />

      <Activity 
        title="Ministérios"
        subtitle="Conheça os ministérios da IPC"
        image={ministryImage}
      />

      <Activity 
        title="Eventos"
        subtitle="Conheça os ministérios da IPC"
        image={eventImage}
      />
    </VStack>
  )
}