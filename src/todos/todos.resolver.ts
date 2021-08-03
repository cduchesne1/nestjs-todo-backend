import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from 'src/models/todo.model';
import { TodosService } from './todos.service';

@Resolver((of) => Todo)
export class TodosResolver {
  constructor(private todosService: TodosService) {}

  @Query((returns) => Todo, { name: 'todo' })
  async getTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todosService.findOneById(id);
  }

  @Query((returns) => [Todo], { name: 'todos' })
  async getAllTodos() {
    return this.todosService.findAll();
  }

  @Mutation((returns) => Todo)
  async createTodo(
    @Args('title') title: string,
    @Args('description') description?: string,
  ) {
    return this.todosService.create({ title: title, description: description });
  }
}
