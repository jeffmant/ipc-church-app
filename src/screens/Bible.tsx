import { useEffect, useState } from "react";

import { Center, FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { Loading } from "../components/Loading";
import { Select } from "../components/Select";
import { SelectItem } from "../components/SelectItem";
import { BIBLE_BOOKS } from "../constants/bible";
import { fetchVerses } from "../remote/get-verses";

type Book = {
  id: string 
  name: string
}

type Verse = {
  number: string 
  text: string
}

export function Bible () {
  const [selectedBook, setSelectedBook] = useState<Book>()
  const [chapters, setChapters] = useState<number>()
  const [selectedChapter, setSelectedChapter] = useState<string>()
  const [verses, setVerses] = useState<Verse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleSelectBook (bookId: string) {
    const foundBook = BIBLE_BOOKS.find((book) => book.id === bookId)
    setSelectedBook(foundBook)
    setChapters(foundBook?.chapters)
    setSelectedChapter('1')
    await getVerses('1')
  }

  async function getVerses (chapter: string) {
    setIsLoading(true)
    try {
      setSelectedChapter(chapter)
      const foundVerses = await fetchVerses(selectedBook?.id, chapter)
      setVerses(foundVerses?.verses)
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar os versículos.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSelectBook('gn')
  }, [])

  return (
      <VStack px={4}>
        <Center mb={8}>
          <HStack mt={16} space={4}>
            <Select 
              placeholder="Livro" 
              onValueChange={itemValue => handleSelectBook(itemValue)} 
              selectedValue={selectedBook?.id} 
            >
              {
                BIBLE_BOOKS?.map((book: { id: string, name: string }) => (
                  <SelectItem 
                    key={book.id} 
                    label={book.name} 
                    value={book.id}
                  />
                ))
              }
            </Select>
            <Select 
              placeholder="Capítulo" 
              onValueChange={(itemValue) => getVerses(itemValue)} 
              selectedValue={selectedChapter} 
            >
              {
                Array.from(new Array(chapters)).map((_chapter: number, index: number) => (
                  <SelectItem 
                    key={index}
                    label={(index + 1)?.toString()}
                    value={(index + 1)?.toString()}  
                  />
                ))
              }
            </Select>
          </HStack>
        </Center>

        {
          isLoading ? <Loading /> :
          (
            <FlatList 
              data={verses}
              keyExtractor={(item, index) => `key-${index}`}
              renderItem={({ item }) => (
                <Text 
                  mt={2}
                  mb={2}
                  fontFamily="body" 
                  fontSize={"lg"} 
                  color="gray.100" 
                  key={item.number}
                >  
                  {item.number}. {item.text}
                </Text>
              )}
              ListEmptyComponent={() => (
                <Center flex={1}>
                  <Heading color="gray.100">
                    Ops! Não encontramos.
                  </Heading>
                </Center>
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 64 }}
            />
          )
        }

      </VStack>
  )
}