import { CustomerResponseDTO } from "src/customer/dto/customer-response.dto";
import { Customer } from "../entities/customer.entity";

export class CustomerMapper {
    static toCustomerResponseDTO(customer: Customer): CustomerResponseDTO {
        return {
            id: customer.id,
            name: customer.firstName + ' ' + customer.lastName,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            user: customer.user.id,
        };
    }
}