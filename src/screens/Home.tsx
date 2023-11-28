import { useUser } from "@clerk/clerk-expo";
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar, HStack, Heading, Icon, ScrollView, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Post } from "../components/Post";


export function Home () {
  const { user } = useUser()

  return (
    <ScrollView showsVerticalScrollIndicator={true} _contentContainerStyle={{ paddingBottom: 10 }}>
      <VStack px={4} mt={8}>
        <TouchableOpacity>
          <HStack
            justifyContent="space-around"
            alignItems="center"
            h={16}
            bg="gray.500"
            px={4}
            my={6}
            fontSize="md"
            color="white"
            rounded="full"
          >
            <Avatar 
              source={{
                uri: user?.imageUrl
              }}
              size={"md"}
            />
            <Heading
              fontFamily="heading"
              fontSize="md"
              color="gray.100"
            >
              Deixe um testemunho
            </Heading>
            <Icon as={MaterialIcons} name="border-color" color="gray.100" />
          </HStack>
        </TouchableOpacity>

        <Post
          description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis molestias dolore error in? Laboriosam animi ad molestias delectus, itaque vero voluptatibus molestiae libero modi, nemo ea. Perspiciatis accusantium accusamus eos!`}
        />

        <Post
          description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis molestias dolore error in? Laboriosam animi ad molestias delectus, itaque vero voluptatibus molestiae libero modi, nemo ea. Perspiciatis accusantium accusamus eos!`}
        />

        <Post
          description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis molestias dolore error in? Laboriosam animi ad molestias delectus, itaque vero voluptatibus molestiae libero modi, nemo ea. Perspiciatis accusantium accusamus eos!`}
        />
      </VStack>
    </ScrollView>
  )
}