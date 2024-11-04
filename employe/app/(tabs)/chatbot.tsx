import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import axios from 'axios';
import { API_KEY } from '@env';


export default function AssistanceScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue à l'assistance", type: 'received' },
    { id: 2, text: "Comment puis-je vous aider ?", type: 'received' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTicketModalVisible, setTicketModalVisible] = useState(false);
  const [ticketMessage, setTicketMessage] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [isSmileyModalVisible, setSmileyModalVisible] = useState(false);
  let retryAfter = 1000;

  const callChatGPT = async (userMessage) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: userMessage }],
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const botMessage = response.data.choices[0].message.content;
      return botMessage;

    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Erreur 429 : Trop de requêtes. Réessai dans quelques secondes.');
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        retryAfter *= 2;
        return callChatGPT(userMessage);
      } else {
        console.error("Erreur lors de l'appel à l'API OpenAI:", error);
        return "Une erreur s'est produite lors de la récupération de la réponse.";
      }
    }
  };

  const sendMessage = async (message) => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, type: 'sent' }]);
      setInputText('');
      const responseMessage = await callChatGPT(message);
      setMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: responseMessage, type: 'received' }
      ]);
    }
  };

  const sendEmotionDirectly = () => {
    sendMessage(`Émotion choisie: ${selectedEmotion}`);
    setSmileyModalVisible(false);
  };

  const handleRectangleClick = (emotion) => {
    setSelectedEmotion(emotion);
    setSmileyModalVisible(true);
  };

  const completeWithMessage = () => {
    const smiley = selectedEmotion === 'heureux' ? '😊' : selectedEmotion === 'neutre' ? '😐' : '😞';
    setInputText(smiley);
    setSmileyModalVisible(false);
  };

  const sendTicket = () => {
    if (ticketMessage.trim()) {
      alert("Ticket envoyé anonymement !");
      setTicketMessage('');
      setTicketModalVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <TouchableOpacity style={styles.profileIcon}>
        <Image source={require('../../assets/images/mail.png')} style={styles.profileImage} />
      </TouchableOpacity>

      <View style={styles.leftIcons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setTicketModalVisible(true)}>
          <Text style={styles.createTicketText}>+ Créer un ticket</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messageList} contentContainerStyle={{ paddingBottom: 100 }}>
        {messages.map((message) => (
          <View key={message.id} style={[styles.messageBox, message.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.rectanglesContainer}>
        <TouchableOpacity style={[styles.rectangle, styles.greenRectangle]} onPress={() => handleRectangleClick('heureux')}>
          <Text style={styles.smiley}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rectangle, styles.orangeRectangle]} onPress={() => handleRectangleClick('neutre')}>
          <Text style={styles.smiley}>😐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.rectangle, styles.redRectangle]} onPress={() => handleRectangleClick('pas content')}>
          <Text style={styles.smiley}>😞</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSmileyModalVisible}
        onRequestClose={() => setSmileyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Émotion : {selectedEmotion}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={sendEmotionDirectly}>
                <Text style={styles.modalButtonText}>Envoyer directement</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={completeWithMessage}>
                <Text style={styles.modalButtonText}>Compléter par un message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTicketModalVisible}
        onRequestClose={() => setTicketModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Créer un ticket</Text>
            <TextInput
              style={styles.ticketInput}
              placeholder="Entrez le contenu du ticket"
              value={ticketMessage}
              onChangeText={setTicketMessage}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setTicketModalVisible(false)}>
                <Text style={styles.modalButtonText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={sendTicket}>
                <Text style={styles.modalButtonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Entre ta demande"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(inputText)}>
          <Image source={require('../../assets/images/mail.png')} style={styles.sendImage} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileIcon: {
    alignSelf: 'flex-end', 
    padding: 10,
    position: 'absolute',
    top: 68,
    right: 20,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  leftIcons: {
    position: 'absolute',
    top: 100,
    left: 20,
    alignItems: 'flex-start',
  },
  createTicketText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 150, 
  },
  messageBox: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', 
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  rectanglesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 130,  
    left: 20,
    right: 20,
  },
  rectangle: {
    height: 50,  
    width: '30%', 
    borderRadius: 5,
    justifyContent: 'center', 
    alignItems: 'center',  
  },
  greenRectangle: {
    backgroundColor: 'green',
  },
  orangeRectangle: {
    backgroundColor: 'orange',
  },
  redRectangle: {
    backgroundColor: 'red',
  },
  smiley: {
    fontSize: 24,  
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    padding: 10,
  },
  sendImage: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ticketInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#3E289B',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
