
enum RepairsStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export class UpdateRepairsDto {
    private constructor(
      public readonly userId: number,
      public readonly date: Date,
      public readonly motorsNumber: number,
      public readonly description: string,
      public readonly status?: RepairsStatus 
    ) {}
  
    static create(object: { [key: string]: any }): [string?, UpdateRepairsDto?] {
      const { userId, date, motorsNumber, description, status } = object;
  
      if (!userId) return ['Missing userId'];
      if (typeof userId !== 'number') return ['userId must be a number'];

      if (!motorsNumber) return ['Missing motorsNumber'];
      if (typeof motorsNumber !== 'number') return ['motorsNumber must be a number'];
  
      if (!description) return ['Missing description'];
      if (typeof description !== 'string') return ['description must be a string'];
    
      if(!status) return ['Missing status'];
      if (!Object.values(RepairsStatus).includes(status as RepairsStatus)) return ['Invalid status'];
  
      return [undefined, new UpdateRepairsDto(userId, date, motorsNumber, description, status)];
    }
  }