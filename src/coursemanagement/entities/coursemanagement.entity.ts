import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Batchmanagement {

    @PrimaryColumn('text',{name:"courseid"})
    courseId: string;

  


    @PrimaryGeneratedColumn({ name: 'batchid' })
    batchId: string;

    @Column({ type: 'jsonb',name:"cert_templates" ,nullable:true})
    certTemplates: { [key: string]: { [key: string]: string } }

    @CreateDateColumn({ type: 'date',name:"created_date" })
    createdDate: Date;

    @Column({ type: 'text',name:"createdby",nullable:true })
    createdBy: string;

    @Column({ type: 'text',name:"createddate",nullable:true })
    createdDateText: string;

    @Column('simple-array',{name:"createdfor",nullable:true})
    createdFor: string[];

    @Column({ type: 'text' ,name:"description"})
    description: string;

    @Column({ type: 'date',name:"end_date" })
    endDate: Date;

    @Column({ type: 'text',name:"enddate" ,nullable:true})
    endDateText: string;

    @Column({ type: 'date',name:"enrollment_enddate",nullable:true })
    enrollmentEndDate: Date;

    @Column({ type: 'text',name:"enrollmentenddate" ,nullable:true})
    enrollmentEndDateText: string;

    @Column({name:"enrollmenttype" })
    enrollmentType: EnrollmentType;

    @Column('simple-array',{name:"mentors",nullable:true})
    mentors: string[];

    @Column({ type: 'text' ,name:"name"})
    name: string;

    @Column({type:'date', name:"start_date" })
    startDate: Date;

    @Column({ type: 'text' ,name:"startdate",nullable:true})
    startDateText: string;

    @Column({ type: 'int',name:"status",nullable:true })
    status: Status;

    @Column({ type: 'boolean' ,name:"tandc",nullable:true})
    tandc: boolean;

    @UpdateDateColumn({ type: 'date',name:"updated_date" ,nullable:true,default:null})
    updatedDate: Date;

    @BeforeInsert()
    updateDatesOnInsert() {
        this.updatedDate = null;
    }

    @Column({ type: 'text',name:"updateddate",nullable:true })
    updatedDateText: string;

}

export enum EnrollmentType {
    OPEN= 'open',
    INVITE_ONLY='invite-only',
}

export enum Status {
    Value1= 0,
    Value2 = 1,
    Value3 = 2

}


