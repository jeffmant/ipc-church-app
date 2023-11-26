import { ScrollView, VStack } from "native-base";
import { Activity } from "../components/Activity";

import cellImage from '../assets/cell.jpg';
import eventImage from '../assets/event.jpg';
import ministryImage from '../assets/ministry.jpg';
import serviceImage from '../assets/service.jpg';

export function Home () {
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <VStack px={8} py={16} mt={8}>
          <Activity 
            title="Cultos"
            subtitle="Você sabe os horários dos nossos cultos?"
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
            subtitle="Fique por dentro da nossa programação"
            image={eventImage}
          />
      </VStack>
    </ScrollView>
  )
}