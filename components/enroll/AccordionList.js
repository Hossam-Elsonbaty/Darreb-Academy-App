import { FlatList, Text } from 'react-native';
import { useState } from 'react';
import AccordionItem from './AccordionItem';

export default function AccordionList() {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    { id: 1, title: 'What is this course?' },
    { id: 2, title: 'How long is the course?' },
    { id: 3, title: 'Is there a certificate?' },
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <AccordionItem
          title={item.title}
          isOpen={openIndex === item.id}
          onToggle={() => setOpenIndex(openIndex === item.id ? null : item.id)}>
          <Text>Accordion content here</Text>
        </AccordionItem>
      )}
    />
  );
}
