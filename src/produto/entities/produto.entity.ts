import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from './../../usuario/entities/usuario.entity';
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({ name: "tb_produto" })
export class Produto {

    @ApiProperty()  
    @PrimaryGeneratedColumn()    
    id: number;

    @ApiProperty()  
    @IsNotEmpty()
    @Column({ length: 100, nullable: false })
    nome: string;

    @ApiProperty()  
    @IsNotEmpty()
    @Column({ length: 1000, nullable: false })
    descricao: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @ApiProperty({ default: true })
    @Column({ type: 'boolean', default: true })
    disponivel: boolean;

    @ApiProperty({ required: false })
    @Column({ length: 255, nullable: true })
    foto: string;

    @ApiProperty({ type: () => Categoria })
    @ManyToOne(() => Categoria, (tema: Categoria) => tema.produto, {
        onDelete: "CASCADE"
    })
    tema: Categoria;

    @ApiProperty({ type: () => Usuario })
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}
