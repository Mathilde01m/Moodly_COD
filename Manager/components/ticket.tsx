import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

// Type pour les tickets
type Ticket = {
  person: string;
  date: string;
  status: string;
  statusColor: string;
};

export default function PayScreen() {
  const [activeTab, setActiveTab] = useState<string>('Ticket'); // Onglet actif
  const [ticketsEntrants, setTicketsEntrants] = useState<Ticket[]>([
    { person: "Personne 6", date: "24-10-2024", status: "Travaille dessus", statusColor: '#E76F51' },
    { person: "Personne 5", date: "23-10-2024", status: "Travaille dessus", statusColor: '#E76F51' },
    { person: "Personne 4", date: "22-10-2024", status: "Travaille dessus", statusColor: '#E76F51' },
    { person: "Personne 3", date: "21-10-2024", status: "Travaille dessus", statusColor: '#E76F51' },
  ]);

  const [ticketsEnAttente, setTicketsEnAttente] = useState<Ticket[]>([
    { person: "Personne 2", date: "20-10-2024", status: "En cours", statusColor: '#F4A261' },
  ]);

  const [ticketsTraites, setTicketsTraites] = useState<Ticket[]>([
    { person: "Personne 1", date: "19-10-2024", status: "Terminer", statusColor: '#A8D5BA' },
  ]);

  const handleStatusChange = (ticket: Ticket, newStatus: string) => {
    const removeTicket = (tickets: Ticket[], setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>) => {
      const updatedTickets = tickets.filter(t => t !== ticket);
      setTickets(updatedTickets);
    };

    const addTicket = (tickets: Ticket[], setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>, status: string, color: string) => {
      const updatedTickets = [...tickets, { ...ticket, status, statusColor: color }];
      setTickets(updatedTickets);
    };

    if (newStatus === 'En cours') {
      removeTicket(ticketsEntrants, setTicketsEntrants);
      removeTicket(ticketsTraites, setTicketsTraites);
      addTicket(ticketsEnAttente, setTicketsEnAttente, 'En cours', '#F4A261');
    } else if (newStatus === 'Terminer') {
      removeTicket(ticketsEntrants, setTicketsEntrants);
      removeTicket(ticketsEnAttente, setTicketsEnAttente);
      addTicket(ticketsTraites, setTicketsTraites, 'Terminer', '#A8D5BA');
    } else if (newStatus === 'Travaille dessus') {
      removeTicket(ticketsEnAttente, setTicketsEnAttente);
      removeTicket(ticketsTraites, setTicketsTraites);
      addTicket(ticketsEntrants, setTicketsEntrants, 'Travaille dessus', '#E76F51');
    }
  };

  const showStatusOptions = (ticket: Ticket) => {
    Alert.alert(
      "Changer le statut",
      "Sélectionnez un nouveau statut",
      [
        { text: "Travaille dessus", onPress: () => handleStatusChange(ticket, "Travaille dessus") },
        { text: "En cours", onPress: () => handleStatusChange(ticket, "En cours") },
        { text: "Terminer", onPress: () => handleStatusChange(ticket, "Terminer") },
        { text: "Annuler", style: "cancel" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Icone de profil en haut à droite */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Section Tickets entrants */}
        <Text style={styles.sectionTitle}>
          Tickets entrants <Text style={styles.counter}>({ticketsEntrants.length})</Text>
        </Text>
        <TicketList tickets={ticketsEntrants} onStatusChange={showStatusOptions} />

        <View style={styles.sectionSpacing} />

        {/* Section Tickets en attentes */}
        <Text style={styles.sectionTitle}>
          Tickets en attentes <Text style={styles.counter}>({ticketsEnAttente.length})</Text>
        </Text>
        <TicketList tickets={ticketsEnAttente} onStatusChange={showStatusOptions} />

        <View style={styles.sectionSpacing} />

        {/* Section Tickets traités */}
        <Text style={styles.sectionTitle}>
          Tickets traités <Text style={styles.counter}>({ticketsTraites.length})</Text>
        </Text>
        <TicketList tickets={ticketsTraites} onStatusChange={showStatusOptions} />
      </ScrollView>
    </View>
  );
}

function TicketList({ tickets, onStatusChange }: { tickets: Ticket[], onStatusChange: (ticket: Ticket) => void }) {
  return (
    <View>
      <View style={styles.ticketHeader}>
        <Text style={styles.headerText}>Personn</Text>
        <Text style={styles.headerText}>Date</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      {tickets.map((ticket, index) => (
        <View key={index} style={styles.ticketRow}>
          <View style={index === tickets.length - 1 ? styles.addRow : styles.rowIndicator} />
          <View style={styles.ticketCell}>
            <Text>{ticket.person}</Text>
          </View>
          <View style={styles.ticketCell}>
            <Text>{ticket.date}</Text>
          </View>
          <View style={styles.statusCell}>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: ticket.statusColor }]}
              onPress={() => onStatusChange(ticket)}
            >
              <Text style={styles.statusText}>{ticket.status}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,  // Réduction de la marge interne pour plus de compacité
    backgroundColor: '#fff',
  },
  profileIcon: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,  // Réduction de l'espace vertical entre les onglets
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,  // Réduction du padding pour rendre les boutons plus petits
    borderRadius: 8,  // Légère réduction du radius pour plus de précision
    marginHorizontal: 3,  // Réduction de l'espace entre les onglets
  },
  activeTab: {
    backgroundColor: '#4E32A8',
  },
  inactiveTab: {
    backgroundColor: '#E0D7F6',
  },
  activeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#4E32A8',
    textAlign: 'center',
    fontWeight: 'bold',
  },



  scrollContainer: {
    paddingBottom: 20,  // Réduction du padding pour plus de densité
  },
  sectionTitle: {
    fontSize: 16,  // Réduction de la taille de la police pour une apparence plus fine
    fontWeight: 'bold',
    marginVertical: 5,  // Réduction de l'espace autour des titres
  },
  counter: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#555',  // Couleur plus douce pour le compteur
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,  // Réduction de l'espacement des en-têtes
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  rowIndicator: {
    width: 5,  // Réduction de l'épaisseur de la barre colorée
    backgroundColor: '#4E32A8',
    marginRight: 1,  // Ajustement de l'espace entre la barre et les cellules
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  addRow: {
    width: 5,
    backgroundColor: '#B3A4D6',
    marginRight: 1,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  ticketCell: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 1,  // Réduction des marges horizontales
    height: 40,  // Ajustement de la hauteur des cellules
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  statusCell: {
    flex: 1,  // Retirer le fond gris
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  statusButton: {
    width: 105, // Largeur absolue pour le bouton de statut
    height: 40, // Hauteur absolue pour le bouton de statut
    justifyContent: 'center', // Centrage vertical du texte
    alignItems: 'center', // Centrage horizontal du texte
    borderRadius: 5,  // Arrondi pour correspondre au style
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,  // Ajustement de la taille du texte dans les boutons de statut
  },
  emptyStatus: {
    width: '100%',
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  sectionSpacing: {
    height: 20,  // Ajoute plus d'espace entre les sections de tickets
  },
});