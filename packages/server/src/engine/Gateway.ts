import EventFactory from "./EventFactory"

export default class Gateway {
  private eventFactory: EventFactory;

  constructor(private tenantId: string) {
    this.eventFactory = new EventFactory(tenantId);  
  }

  createCard(card: ICard) {
    const event = this.eventFactory.cardCreated(card)
  }
}