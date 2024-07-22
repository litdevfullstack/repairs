
enum RepairsStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class CreateRepairsDto {
  private constructor(
    public readonly userId: number,
    public readonly date: Date,
    public readonly motorsNumber: number,
    public readonly description: string,
    public readonly status?: RepairsStatus 
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateRepairsDto?] {
    const { userId, date, motorsNumber, description, status } = object;

    if (!userId) return ['Missing userId'];
    if (typeof userId !== 'number') return ['userId must be a number'];

    if (!date) return ['Missing date'];

    if (!motorsNumber) return ['Missing motorsNumber'];
    if (typeof motorsNumber !== 'number') return ['motorsNumber must be a number'];

    if (!description) return ['Missing description'];
    if (typeof description !== 'string') return ['description must be a string'];

    return [undefined, new CreateRepairsDto(userId, date, motorsNumber, description, status)];
  }
}



