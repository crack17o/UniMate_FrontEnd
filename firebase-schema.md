# Firebase Schema for UniMate

## Collections

### Users Collection
```typescript
users: {
  userId: {
    email: string,
    role: "student" | "professor" | "faculty",
    displayName: string,
    department: string,
    createdAt: timestamp
  }
}
```

### Courses Collection
```typescript
courses: {
  courseId: {
    name: string,
    code: string,
    professorId: string,
    schedule: [{
      day: string,
      startTime: timestamp,
      endTime: timestamp,
      room: string
    }]
  }
}
```

### Sessions Collection
```typescript
sessions: {
  sessionId: {
    courseId: string,
    date: timestamp,
    status: "scheduled" | "ongoing" | "cancelled" | "completed",
    updatedBy: string,
    updatedAt: timestamp
  }
}
```

### Communications Collection
```typescript
communications: {
  communicationId: {
    sender: {
      id: string,
      role: string
    },
    title: string,
    content: string,
    targetAudience: ["all" | "students" | "professors"],
    createdAt: timestamp,
    attachments: string[] // URLs
  }
}
```

### Important Dates Collection
```typescript
importantDates: {
  dateId: {
    title: string,
    description: string,
    date: timestamp,
    type: "exam" | "holiday" | "deadline" | "other",
    courseId?: string, // Optional, for course-specific dates
    createdBy: string,
    createdAt: timestamp
  }
}
```

### Personal Planning Collection
```typescript
personalPlanning: {
  userId: {
    events: [{
      title: string,
      description: string,
      date: timestamp,
      type: string,
      createdAt: timestamp
    }]
  }
}
```

### Library Collection
```typescript
books: {
  bookId: {
    title: string,
    author: string,
    description: string,
    pdfUrl: string,
    uploadedBy: string,
    uploadedAt: timestamp,
    tags: string[]
  }
}
```
