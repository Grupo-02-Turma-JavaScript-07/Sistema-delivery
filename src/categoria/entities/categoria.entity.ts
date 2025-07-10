<<<<<<< HEAD
export class Categoria {
    produto: any;
=======
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { Produto } from 'src/produto/entities/produto.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

//   @OneToMany(() => Produto, produto => produto.categoria)
//   produtos: Produto[];
>>>>>>> d170cf81b6a95982c00e53e2e737772cc50a4428
}