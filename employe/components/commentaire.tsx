import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Composant pour afficher les commentaires
export default function CommentSection() {
  const comments = [
    { comment: "Commentaire 1", moodColor: '#F4A261' },  // Orange
    { comment: "Commentaire 2", moodColor: '#E76F51' },  // Rouge
    { comment: "Commentaire 3", moodColor: '#A8D5BA' },  // Vert clair
    { comment: "Commentaire 4", moodColor: '#A8D5BA' },  // Vert clair
    { comment: "Commentaire 5", moodColor: '#A8D5BA' },  // Vert clair
    { comment: "Commentaire 6", moodColor: '#F4A261' },  // Orange
    { comment: "Commentaire 7", moodColor: '#E76F51' },  // Rouge
    { comment: "Commentaire 8", moodColor: '#A8D5BA' },  // Vert clair
    { comment: "Commentaire 9", moodColor: '#E76F51' },  // Rouge
    { comment: "Commentaire 10", moodColor: '#A8D5BA' },  // Vert clair
    { comment: "Commentaire 11", moodColor: '#F4A261' },  // Orange
    { comment: "Commentaire 12", moodColor: '#E76F51' },  // Rouge
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      {/* Section des commentaires */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Commentaires</Text>
        <Text style={styles.headerText}>Mood</Text>
      </View>

      {comments.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.commentBox}>
            <View style={styles.commentIndicator} />
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>

          <View style={[styles.moodBox, { backgroundColor: item.moodColor }]} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Styles pour la section des commentaires
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  commentBox: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    height: 30,
    borderRadius: 5,
  },
  commentIndicator: {
    width: 8,
    height: '100%',
    backgroundColor: '#4E32A8',
    marginRight: 10,
  },
  commentText: {
    fontSize: 14,
    color: '#000',
  },
  moodBox: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    marginLeft: 5,
  },
});
