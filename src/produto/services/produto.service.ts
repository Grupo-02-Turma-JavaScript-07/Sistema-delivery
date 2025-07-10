import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaController } from '../../categoria/controllers/categoria.controller';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  construtor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private readonly categoriaService: CategoriaService,
    private readonly categoriaController: CategoriaController,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        usuario: true,
        categoria: true
      }
    });
  }
  async findById(id: number): promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        usuario: true,
        categoria: true
      }
    });

    if(!produto)
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FUND);
    return produto;
  }
  async findByName(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        usuario: true,
        categoria: true
      }
    })
  }

  async create(produto: Produto): Promise<Produto> {
    if(produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id;
      );
      if(!categoria) {
        throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FUND);
      }
      const produtoBusca = await this.produtoRepository.findOne({
        where: {
          nome: produto.nome
        }
      });
  
      if (produtoBusca != null) {
        throw new BadRequestException(
          `Produto já existe.`,
        );
      }
      produto.categoria = categoria;
    }
    
    if (produto.usuario) {
      const usuario = await this.usuarioService.findById(produto.usuario.id);

      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.usuario = usuario;
    }

    return await this.produtoRepository.save(produto);
  }
  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    if (produto.categoria) {
      const categoria = await this.categoriaService.findById(
        produto.categoria.id,
      );

      if (!categoria) {
        throw new HttpException(
          'Categoria não encontrada!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.categoria = categoria;
    }

    if (produto.usuario) {
      const usuario = await this.usuarioService.findById(produto.usuario.id);

      if (!usuario) {
        throw new HttpException(
          'Usuário não encontrado!',
          HttpStatus.NOT_FOUND,
        );
      }

      produto.usuario = usuario;
    }

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return this.produtoRepository.delete(id);
  }
}
