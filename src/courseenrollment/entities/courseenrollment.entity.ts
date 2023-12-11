import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('user_enrolments')
export class Courseenrollment {
    @PrimaryColumn({ type: 'text', name: 'userid' })
  userId: string;

  @PrimaryColumn({ type: 'text', name: 'courseid' })
  courseId: string;

  @PrimaryColumn({ type: 'text', name: 'batchid' })
  batchId: string;

  @Column({ type: 'boolean', name: 'active' })
  active: boolean;

  @Column({ type: 'text', name: 'addedby',nullable:true })
  addedBy: string;

  @Column({ type: 'timestamp', name: 'completedon',nullable:true })
  completedOn: Date;

  @Column({ type: 'int', name: 'completionpercentage',nullable:true })
  completionPercentage: number;

  @Column({ type: 'jsonb', name: 'contentstatus' ,nullable:true})
  contentStatus: object;

  @CreateDateColumn({ type: 'timestamp', name: 'datetime'})
  datetime: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'enrolled_date'})
  enrolledDate: Date;



  @Column({ type: 'jsonb', name: 'issued_certificates',nullable:true })
  issuedCertificates: object[];

  @Column({ type: 'timestamp', name: 'lastcontentaccesstime',nullable:true })
  lastContentAccessTime: Date;

  @Column({ type: 'text', name: 'lastreadcontentid',nullable:true })
  lastReadContentId: string;

  @Column({ type: 'int', name: 'lastreadcontentstatus',nullable:true })
  lastReadContentStatus: number;

  @Column({ type: 'int', name: 'progress',nullable:true })
  progress: number;

  @Column({ type: 'int', name: 'status',nullable:true })
  status: number;
}