import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {ImageOnBg} from '../components/layout';
import {RenderMainImage} from '../components/EventScreeComponents';
import {COLOR} from '../contstants/colors';

const EventScreen = ({route}) => {
  const {item} = route.params;


  const renderGalleryItem = ({item}) => (
    <Image source={{uri: item}} style={styles.galleryImage} />
  );

  const renderTheatreEvent = ({item: event}) => {
    
    const keyPerformersArray = Object.entries(event.key_performers || {}).map(
      ([name, role]) => ({name, role}),
    );

    return (
      <View key={event.id} style={styles.eventContainer}>
        {event.image && (
          <Image source={{uri: event.image}} style={styles.eventImage} />
        )}
        <Text style={styles.eventTitle}>{event.name}</Text>
        <Text style={styles.eventComposer}>Composer: {event.composer}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <Text style={styles.eventPlot}>
          <Text style={{color: COLOR.black, fontWeight: '600'}}>Plot: </Text>{' '}
          {event.plot}
        </Text>

        {/* Основні деталі театру */}
        {event.details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Details:</Text>
            <Text style={styles.detailText}>
              Premiere Date: {event.details.premiere_date}
            </Text>
            <Text style={styles.detailText}>
              Duration: {event.details.duration}
            </Text>
            <Text style={styles.detailText}>
              Director: {event.details.director}
            </Text>
            <Text style={styles.detailText}>
              Conductor: {event.details.conductor}
            </Text>
          </View>
        )}

        {/* Якщо є ключові виконавці */}
        {keyPerformersArray.length > 0 && (
          <View style={styles.performersContainer}>
            <Text style={styles.sectionTitle}>Key Performers:</Text>
            {keyPerformersArray.map((performer, index) => (
              <Text key={index} style={styles.performerText}>
                {performer.name} - {performer.role}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderGondolaEvent = ({item: event}) => (
    <View key={event.id} style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{event.name}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.eventDuration}>Duration: {event.duration}</Text>

      <Text style={styles.sectionTitle}>Main Attractions:</Text>
      <FlatList
        data={event.mainAttractions}
        keyExtractor={(attraction, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.attractionContainer}>
            <Text style={styles.attractionText}>
              <Text style={{fontWeight: '600'}}>Name:</Text> {item.name}
            </Text>
            <Text style={styles.attractionText}>
              <Text style={{fontWeight: '600'}}>History: </Text> {item.history}
            </Text>

            {/* Якщо interestingFacts.fact є масивом */}
            <View>
              <Text style={styles.attractionText}>Interesting Facts:</Text>
              {Array.isArray(item.interestingFacts.fact) ? (
                item.interestingFacts.fact.map((factItem, index) => (
                  <Text key={index} style={styles.factText}>
                    {factItem}
                  </Text>
                ))
              ) : (
                <Text>{item.interestingFacts.fact}</Text>
              )}
            </View>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Gallery:</Text>
      <FlatList
        data={event.gallery}
        renderItem={renderGalleryItem}
        keyExtractor={(image, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryContainer}
      />
    </View>
  );
  const renderCarnivalEvent = ({item: event}) => (
    <View key={event.id} style={styles.eventContainer}>
      <Text style={styles.eventTitle}>Carnival Events</Text>

      {/* Перевірка для основних подій */}
      {event.schedule && (
        <View>
          <Text style={styles.sectionTitle}>Schedule:</Text>
          {event.schedule.map((eventItem, index) => (
            <View key={index} style={styles.eventDetailContainer}>
              {eventItem.image && (
                <Image
                  source={{uri: eventItem.image}}
                  style={styles.eventImage}
                />
              )}
              <Text style={styles.eventTitle}>{eventItem.name}</Text>
              <Text style={styles.eventDescription}>
                {eventItem.description}
              </Text>
              <Text style={styles.eventDuration}>
                Schedule: {eventItem.schedule}
              </Text>
              <Text style={styles.eventLocation}>
                Location: {eventItem.location}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Перевірка для основних подій, якщо є */}
      {event.mainEvents && (
        <View>
          <Text style={styles.sectionTitle}>Featured Events:</Text>
          {event.mainEvents.map((featuredEvent, index) => (
            <View key={index} style={styles.eventDetailContainer}>
              <Text style={styles.eventTitle}>{featuredEvent.name}</Text>
              <Text style={styles.eventDescription}>
                {featuredEvent.description}
              </Text>
              <View style={styles.costContainer}>
                <Text style={styles.cost}>Cost: {featuredEvent.cost}</Text>
              </View>
              {featuredEvent.main_features && (
                <View>
                  <Text style={styles.sectionTitle}>Main Features:</Text>
                  {featuredEvent.main_features.map((feature, index) => (
                    <View key={index} style={styles.featureContainer}>
                      <Text style={styles.featureName}>{feature.feature}</Text>
                      <Text style={styles.featureDescription}>
                        {feature.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
              {featuredEvent.photo && (
                <Image
                  source={{uri: featuredEvent.photo}}
                  style={styles.featureImage}
                />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderIslandEvent = ({item: event}) => (
  
    <View style={styles.islandContainer}>
      <Text style={styles.islandTitle}>
        {item.type}: {item.events.name}
      </Text>
      <Image source={{uri: event.coverImage}} style={styles.islandCoverImage} />

      {item.events.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.name}</Text>
          <Image source={{uri: event.photo}} style={styles.eventImage} />
          <Text style={styles.eventDescription}>{event.description}</Text>
          <Text style={styles.eventHistory}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>History:</Text>{' '}
            {event.history}
          </Text>

          {/* Рендеринг цікавих фактів */}
          <Text style={styles.sectionTitle}>Interesting Facts:</Text>
          {event.interesting_facts.map((fact, factIndex) => (
            <Text
              key={factIndex}
              style={[styles.interestingFact, {fontSize: 16, marginTop: 8}]}>
              - {fact}
            </Text>
          ))}

          {/* Рендеринг місць */}
          <Text style={styles.sectionTitle}>Places to Visit:</Text>
          {event.places.map((place, placeIndex) => (
            <View key={placeIndex} style={styles.placeContainer}>
              <Text
                style={[
                  styles.placeName,
                  {fontSize: 16, fontWeight: 'bold', marginVertical: 5},
                ]}>
                {place.name}
              </Text>
              <Text style={[styles.placeDescription, {fontSize: 17}]}>
                {place.description}
              </Text>
              {place.photo && (
                <Image source={{uri: place.photo}} style={styles.placeImage} />
              )}
            </View>
          ))}
          <View style={styles.costContainer}>
            <Text style={styles.cost}>Cost: {event.cost}</Text>
          </View>
        </View>
      ))}

      {/* {event?.map((eventDetail, index) => (
          <View key={index} style={styles.eventDetailContainer}>
            <Text style={styles.eventName}>{eventDetail.name}</Text>
            <Text style={styles.eventDescription}>
              {eventDetail.description}
            </Text>
            <Text style={styles.eventCost}>Cost: {eventDetail.cost}</Text>
            <Text style={styles.eventHistory}>
              History: {eventDetail.history}
            </Text>

           
            <Text style={styles.sectionTitle}>Interesting Facts:</Text>
            {eventDetail.interesting_facts.map((fact, factIndex) => (
              <Text key={factIndex} style={styles.interestingFact}>
                - {fact}
              </Text>
            ))}

         
            <Text style={styles.sectionTitle}>Places to Visit:</Text>
            {eventDetail.places.map((place, placeIndex) => (
              <Text key={placeIndex} style={styles.place}>
                - {place}
              </Text>
            ))}

           
            {eventDetail.photo && (
              <Image
                source={{uri: eventDetail.photo}}
                style={styles.eventImage}
              />
            )}
          </View>
        ))} */}
    </View>
  );

  const renderSquareEvent = ({item: event}) => {
    return (
      <ScrollView style={styles.eventContainer}>
        {/* Назва площі */}
        <Text style={[styles.title, {color: COLOR.blue}]}>{event.title}</Text>
        {/* Опис площі */}
        <Text style={styles.description}>{event.description}</Text>

        {/* Особливості площі */}
        {event.features.map((feature, featureIndex) => (
          <View key={featureIndex} style={styles.featureContainer}>
            {/* Назва об'єкта */}
            <Text style={styles.featureTitle}>{feature.name}</Text>
            {/* Опис об'єкта */}
            <Text style={styles.featureDescription}>{feature.description}</Text>

            {/* Історична інформація об'єкта */}
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>History</Text>
              {feature.history?.origin && (
                <Text style={{marginVertical: 8}}>
                  <Text style={styles.historyLabel}>Origin:</Text>{' '}
                  <Text style={{fontSize: 16, textAlign: 'center'}}>
                    {feature.history.origin}
                  </Text>
                </Text>
              )}
              {feature.history?.architectural_changes && (
                <Text>
                  <Text style={styles.historyLabel}>
                    Architectural Changes:
                  </Text>{' '}
                  <Text style={{fontSize: 16, textAlign: 'center'}}>
                    {feature.history.architectural_changes}
                  </Text>
                </Text>
              )}
              {feature.history?.first_construction && (
                <Text>
                  <Text style={styles.historyLabel}>First Construction:</Text>{' '}
                  {feature.history.first_construction}
                </Text>
              )}
              {feature.history?.architectural_style && (
                <Text>
                  <Text style={styles.historyLabel}>Architectural Style:</Text>{' '}
                  {feature.history.architectural_style}
                </Text>
              )}
            </View>

            {/* Цікаві факти про об'єкт */}
            {feature.interesting_facts && (
              <View style={styles.factsContainer}>
                <Text style={[styles.factsTitle, {marginVertical: 8}]}>
                  Interesting Facts
                </Text>
                {feature.interesting_facts.map((fact, factIndex) => (
                  <Text
                    key={factIndex}
                    style={[styles.factItem, {marginVertical: 8}]}>
                    - {fact}
                  </Text>
                ))}
              </View>
            )}

            {/* Інформація для відвідувачів */}
            <View style={[styles.visitInfoContainer, {marginVertical: 8}]}>
              <Text style={styles.visitInfoTitle}>Visit Information</Text>
              <Text style={{marginVertical: 8, fontSize: 16}}>
                <Text style={[styles.visitInfoLabel]}>Opening Hours:</Text>{' '}
                {feature.visit_information.opening_hours}
              </Text>
              <Text style={{marginVertical: 8, fontSize: 16}}>
                <Text style={styles.visitInfoLabel}>Tickets:</Text>{' '}
                {feature.visit_information.tickets}
              </Text>
            </View>

            {/* Фотографія об'єкта */}
            <Image source={{uri: feature.photo}} style={styles.photo} />
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderMuseumEvent = ({item: museum}) => {
    return (
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>{museum.name}</Text>
        {museum.photo && (
          <Image source={{uri: museum.photo}} style={styles.photo} />
        )}
        <Text style={styles.eventDescription}>{museum.description}</Text>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>History</Text>
          <Text>
            <Text style={styles.historyLabel}>Origin:</Text>{' '}
            <Text style={{fontSize: 16}}>{museum.history.origin}</Text>
          </Text>
          {museum.history.development && (
            <View style={{marginVertical: 10}}>
              <Text>
                <Text style={styles.historyLabel}>Development:</Text>{' '}
                <Text style={{fontSize: 16}}>{museum.history.development}</Text>
              </Text>
            </View>
          )}
          {museum.history.reconstructions && (
            <View style={{marginVertical: 10}}>
              <Text>
                <Text style={styles.historyLabel}>Reconstructions:</Text>{' '}
                <Text style={{fontSize: 16}}>
                  {museum.history.reconstructions}
                </Text>
              </Text>
            </View>
          )}
          {museum.history.collection && (
            <View style={{marginVertical: 10}}>
              <Text>
                <Text style={styles.historyLabel}>Collection:</Text>{' '}
                <Text style={{fontSize: 16}}>{museum.history.collection}</Text>
              </Text>
            </View>
          )}
        </View>
        {museum.interesting_facts && museum.interesting_facts.length > 0 && (
          <View style={[styles.factsContainer,]}>
            <Text style={[styles.factsTitle,]}>Interesting Facts</Text>
            {museum.interesting_facts.map((fact, factIndex) => (
              <Text key={factIndex} style={[styles.factItem,{marginVertical:8}]}>
                - {fact}
              </Text>
            ))}
          </View>
        )}
        <Text style={[styles.hoursTitle, {fontSize: 16, fontWeight: 'bold'}]}>
          Opening Hours
        </Text>
        <Text style={{fontSize: 16}}>
          {museum.hours_of_operation || museum.opening_hours}
        </Text>
        <View style={styles.costContainer}>
          <Text>Cost: {museum.cost}</Text>
        </View>
        <View style={{height: 100}}></View>
      </View>
    );
  };

  const renderEventItem = ({item: event}) => {
    switch (item.type) {
      case 'Theatre':
        return renderTheatreEvent({item: event});
      case 'Gondola':
        return renderGondolaEvent({item: event});
      case 'Carnival':
        return renderCarnivalEvent({item: event});
      case 'Island':
        return renderIslandEvent({item: event});
      case 'Square':
        return renderSquareEvent({item: event});
      case 'Museum':
        return renderMuseumEvent({item: event});
      default:
        return null;
    }
  };
  return (
    <ImageOnBg>
      <RenderMainImage image={item.coverImage} />

      <FlatList
        data={item.events}
        keyExtractor={(image, index) => index.toString()}
        renderItem={renderEventItem}
        contentContainerStyle={styles.contentContainer}
      />
      {/* <View style={{height: 150}}></View> */}
    </ImageOnBg>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.gold,
    textAlign: 'center',
    marginBottom: 20,
  },
  eventContainer: {
    marginBottom: 30,
    backgroundColor: COLOR.grey,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.blue,
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 18,
    color: COLOR.black,
    marginBottom: 10,
    lineHeight: 24,
  },
  eventDuration: {
    fontSize: 16,
    color: COLOR.gray,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLOR.purple,
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  attractionText: {
    fontSize: 18,
    color: COLOR.black,
    marginLeft: 10,
    lineHeight: 24,
    marginTop: 10,
  },
  galleryContainer: {
    marginTop: 10,
  },
  galleryImage: {
    width: Dimensions.get('window').width / 3,
    height: 120,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 8,
  },
  eventImage: {
    width: Dimensions.get('window').width - 70, // Зменшити ширину, якщо потрібно
    height: 150, // Зменшити висоту, якщо потрібно
    marginBottom: 10,
    borderRadius: 10,
  },
  eventPlot: {
    fontSize: 16,
    color: COLOR.black,
    marginBottom: 10,
  },
  cost: {
    textAlign: 'center',
  },
  costContainer: {
    width: '30%',
    backgroundColor: COLOR.gold,
    padding: 5,
    borderRadius: 12,
    marginVertical: 5,
  },
  container: {
    padding: 16,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  featureContainer: {
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  historyContainer: {
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  historyLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  factsContainer: {
    marginBottom: 16,
  },
  factsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  factItem: {
    fontSize: 16,
  },
  visitInfoContainer: {
    marginBottom: 16,
  },
  visitInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  visitInfoLabel: {
    fontWeight: 'bold',
  },
  photo: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  detailText: {
    fontWeight: '500',
    fontSize: 16,
  },
  performerText: {fontWeight: '500', fontSize: 16},
  eventHistory: {fontSize: 16, lineHeight: 20},
});
